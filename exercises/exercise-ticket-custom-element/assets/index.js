import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './style.css';

// API helper function
const api = async (url, options = {}) => {
	return fetch(window.location.origin + '/' + url, {
		headers: {
			'Content-Type': 'application/json',
			'x-csrf-token': Liferay.authToken,
		},
		...options,
	});
};

// Function to get current user ID
const getCurrentUserId = async () => {
	const response = await api('o/headless-admin-user/v1.0/my-user-account');
	const data = await response.json();
	return data.id;
};

// Ticket component
const Ticket = React.memo(({ ticket, onToggle, isOpen }) => (
	<div className="ticket-card" onClick={() => onToggle(ticket.id)}>
		<div className="ticket-header">
			<h3 className="ticket-subject">{ticket.subject}</h3>
			<span className={`ticket-status ${ticket.priority?.key}`}>
				{ticket.ticketStatus.name}
			</span>
		</div>
		{isOpen && (
			<div className="ticket-details">
				<p>Description: {ticket.description}</p>
				{ticket.attachment && (
					<a
						href={ticket.attachment.link.href}
						target="_blank"
						rel="noopener noreferrer"
						className="ticket-attachment"
					>
						View Attachment
					</a>
				)}
				{ticket.relatedTickets && ticket.relatedTickets.length > 0 && (
					<div className="related-tickets">
						<h4>Related Tickets</h4>
						{ticket.relatedTickets.map((related) => (
							<div className="related-ticket-item" key={related.id}>
								ID: {related.id} - {related.subject}
							</div>
						))}
					</div>
				)}
			</div>
		)}
	</div>
));

// Main component to display tabs and tickets list
function TicketsList() {
	const [tickets, setTickets] = useState([]);
	const [expandedTicket, setExpandedTicket] = useState(null);
	const [selectedStatus, setSelectedStatus] = useState('open');
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchTickets = async () => {
			try {
				setIsLoading(true);
				const userId = await getCurrentUserId();
				const response = await api('o/c/tickets');
				const data = await response.json();
				const userTickets = (data.items || []).filter(
					(ticket) => ticket.creator?.id === userId
				);
				setTickets(userTickets || []);
			} catch (error) {
				console.error('Error fetching tickets:', error);
				setError('Failed to load tickets.');
			} finally {
				setIsLoading(false);
			}
		};

		fetchTickets();
	}, []);

	const toggleTicket = (ticketId) => {
		setExpandedTicket(expandedTicket === ticketId ? null : ticketId);
	};

	const filteredTickets = tickets.filter(
		(ticket) => ticket.ticketStatus.key === selectedStatus
	);

	if (isLoading) {
		return <div className="loading">Loading...</div>;
	}

	if (error) {
		return <div className="error">{error}</div>;
	}

	if (filteredTickets.length === 0) {
		return <div className="no-tickets">No tickets available for this status.</div>;
	}

	return (
		<div className="tickets-container">
			<div className="tabs">
				{['open', 'inProgress'].map((status) => (
					<button
						key={status}
						className={`tab-button ${selectedStatus === status ? 'active' : ''}`}
						onClick={() => setSelectedStatus(status)}
						aria-selected={selectedStatus === status}
					>
						{status.charAt(0).toUpperCase() + status.slice(1)}
					</button>
				))}
			</div>
			<div className="tickets-list">
				{filteredTickets.map((ticket) => (
					<Ticket
						key={ticket.id}
						ticket={ticket}
						onToggle={toggleTicket}
						isOpen={expandedTicket === ticket.id}
					/>
				))}
			</div>
		</div>
	);
}

// Custom Element class
class CustomElement extends HTMLElement {
	connectedCallback() {
		// Ensure the React component is rendered only once
		if (!this.rendered) {
			// Create a container if it doesn't exist
			const container = document.createElement('div');
			container.id = 'tickets-root';
			this.appendChild(container);

			// Render the React component into the container
			ReactDOM.render(<TicketsList />, container);
			this.rendered = true;
		}
	}

	disconnectedCallback() {
		// Clean up the React component when the element is removed
		const container = this.querySelector('#tickets-root');
		if (container) {
			ReactDOM.unmountComponentAtNode(container);
		}
		this.rendered = false;
	}
}

// Define the custom element
const ELEMENT_NAME = 'liferay-clarity-custom-element';

if (!customElements.get(ELEMENT_NAME)) {
	customElements.define(ELEMENT_NAME, CustomElement);
}

// Automatically add the custom element to the page if not already present
document.addEventListener('DOMContentLoaded', () => {
	if (!document.querySelector(ELEMENT_NAME)) {
		const customElement = document.createElement(ELEMENT_NAME);
		document.body.appendChild(customElement);
	}
});

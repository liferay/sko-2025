import json

# Original structure for a single ticket
template_ticket = {
    "dateCreated": "2023-05-04T21:49:04Z",
    "dateModified": "2023-05-04T21:49:04Z",
    "description": "This is a simulated ticket for the migration exercise, ticket 1.",
    "externalReferenceCode": "TICKET_i",
    "priority": {
        "key": "minor",
        "name": "Minor"
    },
    "region": {
        "key": "lATAM",
        "name": "LATAM"
    },
    "status": {
        "code": 0,
        "label": "approved",
        "label_i18n": "Approved"
    },
    "subject": "How to adjust or tighten my frames?",
    "ticketStatus": {
        "key": "open",
        "name": "Open"
    },
    "type": {
        "key": "other",
        "name": "Other"
    }
}

# Generate 400 new tickets without the `attachment` field
tickets = []
for i in range(1, 401):
    ticket = template_ticket.copy()
    ticket["externalReferenceCode"] = f"NEW_TICKET_{i}"
    ticket["subject"] = f"Test Ticket {i}"
    ticket["description"] = f"This is a simulated ticket for the migration exercise, ticket {i}."
    tickets.append(ticket)

# Create the final JSON structure
final_json = {"items": tickets}

# Save to a file
with open("finalized_400_tickets_no_attachment.json", "w") as output_file:
    json.dump(final_json, output_file, indent=4)

print("JSON file 'finalized_400_tickets_no_attachment.json' created successfully!")

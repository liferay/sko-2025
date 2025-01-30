package com.clarityvisionsolutions.distributor.mgmt.actions;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;

import org.springframework.stereotype.Service;

/**
 * Manages the queue of user creation requests.
 *
 * @author dnebing
 */
@Service
public class UserCreatedRequestQueueManager {

	/**
	 * Waits for work to be available.
	 *
	 * @throws InterruptedException if the thread is interrupted while waiting for work
	 */
	public void awaitWork() throws InterruptedException {
		_lock.lock();

		try {
			while (isEmpty()) {
				_notEmpty.await(); // Wait until notified
			}
		}
		finally {
			_lock.unlock();
		}
	}

	/**
	 * Dequeues a user creation request.
	 *
	 * @return the user creation request
	 * @throws InterruptedException if the thread is interrupted while waiting for a user creation request
	 */
	public UserCreatedRequest dequeue() throws InterruptedException {

		// Remove the request from the queue

		return _queue.take();
	}

	/**
	 * Enqueues a user creation request.
	 *
	 * @param userCreatedRequest the user creation request
	 */
	public void enqueue(UserCreatedRequest userCreatedRequest) {

		// Add the request to the queue

		_queue.add(userCreatedRequest);

		// signal the executor that work is available

		_signalExecutor();
	}

	/**
	 * Checks if the queue is empty.
	 *
	 * @return true if the queue is empty, false otherwise
	 */
	public boolean isEmpty() {
		return _queue.isEmpty();
	}

	/**
	 * Signals the executor that work is available.
	 */
	private void _signalExecutor() {
		_lock.lock();

		try {
			_notEmpty.signal(); // Notify the executor that work is available
		}
		finally {
			_lock.unlock();
		}
	}

	private final ReentrantLock _lock = new ReentrantLock();
	private final Condition _notEmpty = _lock.newCondition();
	private final BlockingQueue<UserCreatedRequest> _queue =
		new LinkedBlockingQueue<>();

}
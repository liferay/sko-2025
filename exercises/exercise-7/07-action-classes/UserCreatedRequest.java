package com.clarityvisionsolutions.distributor.mgmt.actions;

import org.springframework.security.oauth2.jwt.Jwt;

/**
 * Represents a user creation request.
 *
 * @author dnebing
 */
public class UserCreatedRequest {

	public UserCreatedRequest(String userJSON, Jwt jwt) {
		_userJSON = userJSON;
		_jwt = jwt;
	}

	public Jwt getJwt() {
		return _jwt;
	}

	public String getUserJSON() {
		return _userJSON;
	}

	private final Jwt _jwt;
	private final String _userJSON;

}
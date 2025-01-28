/**
 * SPDX-FileCopyrightText: (c) 2023 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

package com.claritysolutions.distributor.mgmt.actions;

import com.liferay.client.extension.util.spring.boot.BaseRestController;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Invoked when a new user account has been created.
 *
 * @author Raymond Augé
 * @author Gregory Amerson
 * @author Brian Wing Shun Chan
 * @author dnebing
 * @author Jeff Handa
 */
@RequestMapping("/distributor/mgmt/create-account")
@RestController
public class CreateAccountActionRestController extends BaseRestController {

     /**
     * Invoked when a new a Distributor Application is approved.
     *
     * @param jwt the JWT token
     * @param json the user creation request in JSON format
     * @return the response entity
     * @throws Exception if an error occurs
     */
    @PostMapping
    public ResponseEntity<String> post(
            @AuthenticationPrincipal Jwt jwt, @RequestBody String json)
            throws Exception {

        System.out.println("Creating Object Action");

        log(jwt, _log, json);

        return new ResponseEntity<>(json, HttpStatus.OK);
    }

    private static final Log _log = LogFactory.getLog(
            CreateAccountActionRestController.class);
}
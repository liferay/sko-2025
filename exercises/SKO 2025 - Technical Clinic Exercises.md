![Cover Image](./pdf-images/sko-exercises-cover-image.png)

# Exercises for Mastering Liferay Client Extensions - SKO 2025 Edition

## Table of Contents

* [Exercise 1: Setting Up the SKO Workspace](#exercise-1-setting-up-the-sko-workspace)
* [Exercise 2: Exporting the Contact Us Object Definition](#exercise-2-exporting-the-contact-us-object-definition)
* [Exercise 3a: Preparing Clarity's Distributor Management App Payload](#exercise-3a-preparing-claritys-distributor-management-app-payload)
* [Exercise 3b: Configuring the Batch Client Extension](#exercise-3b-configuring-the-batch-client-extension)
* [Exercise 3c: Deploying the Client Extension](#exercise-3c-deploying-the-client-extension)

## Exercise 1: Setting Up the SKO Workspace

Throughout the technical clinic, you'll use a local Liferay workspace for the hands-on exercises and practice what you learn. For that purpose, ensure you've completed the SKO Technical Clinic Prerequisites sent via email.

1. Open your terminal and run this command to verify Git is installed:

   ```bash
   git version
   ```

   **Note**: If you're on Windows, use Command Prompt, PowerShell, or BASH to execute terminal commands.

   This returns the version of your git installation. For example,

   ```log
   git version 2.45.2
   ```

   If the Git command isn't found, please see official documentation for how to install Git for your OS ([macOS](https://git-scm.com/download/mac)|[Windows](https://git-scm.com/download/win)|[Linux/Unix](https://git-scm.com/download/linux)).

1. Verify Java JDK 21 is installed:

   ```bash
   java -version
   ```

   The JDK version should display:

   ```log
   openjdk version "21.0.5" 2024-10-15 LTS
   OpenJDK Runtime Environment Zulu21.38+21-CA (build 21.0.5+11-LTS)
   OpenJDK 64-Bit Server VM Zulu21.38+21-CA (build 21.0.5+11-LTS, mixed mode, sharing)
   ```

   If Java isn't installed, you can find the appropriate OpenJDK distribution installer for your OS [here](https://learn.microsoft.com/en-us/java/openjdk/download#openjdk-21). Alternatively, you can download the JDK as a ZIP (Windows) or TAR.GZ (Linux/Mac) package. To install, extract the file in a folder of your choice, then set the JAVA_HOME environment variable to that folder.

   **Note**: If you support multiple Liferay projects and need to switch between different JDK versions, consider using a Version Manager:

      * **Unix-based systems**:
         * [SDKMAN!](https://sdkman.io/)
         * [jEnv](https://www.jenv.be/)
      * **Windows**:
         * [Jabba](https://github.com/shyiko/jabba)
         * [JVMS](https://github.com/ystyle/jvms)

1. (Optional) Verify Blade is installed:

   ```bash
   blade version
   ```

   It should return the CLI's version:

   ```log
   blade version 6.0.0.202404102137
   ```

   If Blade isn't installed, see [Blade CLI](https://learn.liferay.com/w/dxp/liferay-development/tooling/blade-cli) installation instructions.

   If the output indicates there's a newer version, run this command to update it:

   ```log
   blade update
   ```

   **Note**: While we recommend using Blade to set up Liferay Workspace, you can also use Gradle to complete the process manually. See [Creating a Liferay Workspace Manually](https://learn.liferay.com/web/guest/w/dxp/building-applications/tooling/liferay-workspace/creating-a-liferay-workspace#creating-a-liferay-workspace-manually) for more information.

1. In your terminal, go to your desired folder and clone the training workspace to your computer:

   ```bash
   git clone https://github.com/liferay/sko-2025
   ```

   This saves a copy of the project in your current terminal directory.

   **Note**: If you've cloned the repo previously, ensure your workspace is up to date by running `git pull origin main`.

1. Go to the workspace's root folder in your terminal:

   ```bash
   cd sko-2025/
   ```

1. Initialize your Liferay bundle:

   ```bash
   blade server init
   ```

   This downloads and builds dependencies for running Liferay, including the Liferay server.

1. Use Blade to start your Liferay server:

   ```bash
   blade server run
   ```

   Alternatively,

   **Unix-based**:

   ```bash
   ./bundles/tomcat/bin/catalina.sh run
   ```

   **Windows**:
   ```bash
   .\bundles\tomcat\bin\catalina.bat run
   ```

   **Tip**: Wait until you see `org.apache.catalina.startup.Catalina.start Server startup in X milliseconds` to indicate startup completion.

1. When finished, access your Liferay DXP instance by going to `http://localhost:8080/` in your browser.

1. Sign in using these credentials:

   * Username: `admin@clarityvisionsolutions.com`
   * Password: `learn`

1. Take some time to explore the site and resources included in the training workspace.

Great! With your environment set up, you're ready to start contributing to Clarity's solutions!

## Exercise 2: Exporting the Contact Us Object Definition

Here, you'll export Clarity's Contact Us object definition and explore its associated JSON file.

1. In your running Liferay instance, sign in as the Clarity Admin user.

   * Username: `admin@clarityvisionsolutions.com`
   * Password: `learn`

1. Open the *Global Menu* (![Global Menu](./pdf-images/icons/icon-applications-menu.png)), go to the *Control Panel* tab, and click *Objects*.

1. Click *Actions* (![Actions](./pdf-images/icons/icon-actions.png)) for the Contact Us object and select *Export Object Definition*.

   ![Click Actions for the Contact Us object and select Export Object Definition.](./pdf-images/exercise-2/01.png)

1. Click on the *Contact Us* object and navigate to the *Fields* tab, identifying the currently included fields.

   ![Identify the currently included fields in the Contact Us object.](./pdf-images/exercise-2/02.png)

1. Open the downloaded `Object_Definition_ContactUs_[...].json` file in a text editor or IDE.

   **Note**: Many text editors and IDEs offer extensions to “prettify” JSON code, improving its readability for human comprehension.

1. Examine the file's JSON elements and nested values.

Great! By successfully exporting one of Clarity's object definitions and exploring its JSON structure, you've completed the crucial first steps for preparing a batch client extension. Next, you'll learn how to package exported files from Clarity's Distributor Management app into a batch client extension.

## Exercise 3a: Preparing Clarity's Distributor Management App Payload

Here, you'll package the Distributor Management app's exported resources into a client extension project and create a batch payload from the object definition file.

1. Open a file explorer and navigate to the `exercises/exercise-3/` folder in your course workspace.

1. Rename the `liferay-sample-batch` folder to `clarity-distributor-mgmt-batch`.

   **Note**: The `liferay-sample-batch` client extension was downloaded from the [Liferay Sample Workspace](https://github.com/liferay/liferay-portal/tree/master/workspaces/liferay-sample-workspace). As a best practice, use examples within this workspace as the baseline for your own client extension projects, as this serves as the primary source of truth for client extension implementation.

1. Within the `clarity-distributor-mgmt-batch/batch/` folder, delete the existing `.json` files.

1. From the previous `exercise-3/` folder, move these files into the `clarity-distributor-mgmt-batch/batch/` folder:

   * `00-list-type-definition.batch-engine-data.json`
   * `02-user-role.batch-engine-data.json`
   * `03-workflow-definition.batch-engine-data.json`
   * `04-notification-definition.batch-engine-data.json`
   * `Object_Definitions.json`

   These files contain all the resources for Clarity's Distributor Management app: the picklists, user roles, workflow, notification templates, and the object definitions.

   **Note**: It's best practice to include a numeric prefix to each file name to determine the order in which they're imported upon deployment. This is useful when subsequent files require pre-populated dependencies from other files.

1. Navigate to the `clarity-distributor-mgmt-batch/batch/` folder.

1. Rename the `Object_Definitions.json` file to `01-object-definition.batch-engine-data.json`.

   This puts the object definition batch file in the second deployment position.

1. From the `exercise-3/code-samples/` folder, open the `object-payload-configuration.txt` file and copy its content.

   This file contains the payload configuration block for the object definitions.

1. Open the `clarity-distributor-mgmt-batch/batch/01-object-definition.batch-engine-data.json` file with a text editor or IDE.

1. Paste the code snippet from the `object-payload-configuration.txt` file within the first opening curly brace (`{`), prior to the `items` block:

   This defines the batch payload's configuration and specifies the object definitions as the data block.

1. Your file should resemble this:

   ```json
   {
      "configuration": {
         "className": "com.liferay.object.admin.rest.dto.v1_0.ObjectDefinition",
         "parameters": {
            "containsHeaders": "true",
            "createStrategy": "UPSERT",
            "onErrorFail": "ON_ERROR_FAIL",
            "updateStrategy": "UPDATE"
         },
         "taskItemDelegateName": "DEFAULT"
      },
      "items": [
         {
            "active": true,
            "defaultLanguageId": "en_US",
            "enableCategorization": true,
            "enableIndexSearch": true,
            "enableObjectEntryDraft": true,
            "externalReferenceCode": "D4B8_DISTRIBUTOR_APPLICATION",
            [...]
            "titleObjectFieldName": "creator"
         }
      ]
   }
   ```

   **Note**: Ensure the object definitions are under the `items` block as a valid JSON before proceeding.

1. Save the file.

Great! You've moved the Distributor Management app's resources into a client extension project and created a batch payload from the object definition file. Next, you'll define the `client-extension.yaml` file.

## Exercise 3b: Configuring the Batch Client Extension

Here, you'll define the structure, resources, and configurations needed to deploy and manage the batch client extension.

1. Within the `clarity-distributor-mgmt-batch/` project folder, open the `client-extension.yaml` with a text editor or IDE.

1. Delete the file's existent content.

1. From the `exercise-3/code-samples/` folder, open the `client-extension-assemble-block.txt` file and copy its content.

1. Paste the code snippet in the `client-extension.yaml` file you opened previously.

   This adds the `assemble` block to specify which resources the client extension should package during the build process.

1. Open the `client-extension-definition-block.txt` file in the `code-samples/` folder, copy the code snippet, and paste it in the `client-extension.yaml` file under the `assemble` block.

   This adds the batch client extension definition for Clarity's Distributor Management app, including its name, the OAuth 2.0 server reference, and type.

1. Open the `client-extension-server-block.txt` file in the `code-samples/` folder, copy the code snippet, and paste it in the `client-extension.yaml` file under the client extension definition block.

   This adds an OAuth 2.0 headless server client extension for authorizing API calls with the necessary scopes for the batch client extension.

   **Note**: To find the correct API scopes for your batch client extension, go into your Liferay instance's UI, open the *Global Menu* (![Global Menu](./pdf-images/icons/icon-applications-menu.png)), go to the *Control Panel* tab, and click *OAuth 2 Administration*. Select an OAuth 2.0 application from the list and go to the *Scopes* tab. This section displays all available Liferay API scopes.

1. Your file should resemble this:

   ```yaml
   assemble:
      - from: batch
        into: batch
   clarity-distributor-mgmt-batch:
      name: Clarity Distributor Management Batch
      oAuthApplicationHeadlessServer: clarity-distributor-mgmt-batch-oauth-application-headless-server
      type: batch
   clarity-distributor-mgmt-batch-oauth-application-headless-server:
      .serviceAddress: localhost:8080
      .serviceScheme: http
      name: Clarity Distributor Management Batch OAuth Application Headless Server
      scopes:
         - Liferay.Headless.Admin.List.Type.everything
         - Liferay.Headless.Admin.User.everything
         - Liferay.Headless.Admin.Workflow.everything
         - Liferay.Headless.Batch.Engine.everything
         - Liferay.Notification.REST.everything
         - Liferay.Object.Admin.REST.everything
      type: oAuthApplicationHeadlessServer
   ```

1. Save the file.

   With the client extension set up, you can now move it to the appropriate workspace location.

1. Move the `clarity-distributor-mgmt-batch/` project folder into the `client-extensions/` folder of your course workspace.

   **Note**: Copying and pasting the project will result in a deployment failure due to the duplicate client extension folders. To prevent this, move the project to the `client-extensions/` folder.

Great! You've fully configured Clarity's Distributor Management batch client extension. Next, you'll deploy it into your Liferay environment.

## Exercise 3c: Deploying the Client Extension

Here, you'll deploy the batch client extension to add the Distributor Management app into your Liferay instance.

1. Open a terminal and navigate to the `client-extensions/clarity-distributor-mgmt-batch/` in your course workspace.

1. Run this command to build and deploy the client extension:

   ```bash
   blade gw clean deploy
   ```

   In your Liferay logs, you'll find various messages related to import tasks executed by the `BatchEngineImportTaskExecutorImpl` module. These import tasks correspond to the files within the `batch/` folder.

1. Open your instance logs and search for a message similar to this:

   ```log
   [...] Started batch engine import task 904
   ```

   This informs you that the batch engine has started an import task with the assigned ID `904`.

1. Search for another message similar to this:

   ```log
   [...] Finished batch engine import task 904 in 48ms
   ```

   This indicates that the import task with the ID `904` has finished.

   **Note**: You can use the import task ID (e.g., `904`) to retrieve information from the Batch API for troubleshooting errors and unexpected behaviors. Explore this in more detail in the Mastering Liferay's Headless APIs (*Coming Soon*) course.

1. Verify it deploys successfully.

   ```log
   INFO [fileinstall-directory-watcher][BundleStartStopLogger:68] STARTED claritydistributormgmtbatch_7.4.13 [1462]
   ```

   Now that you've deployed the batch client extension, you can examine the Distributor Management app.

1. In your Liferay instance, sign in as the Clarity Admin user.

   * Username: `admin@clarityvisionsolutions.com`
   * Password: `learn`

1. Open the *Global Menu* (![Global Menu](./pdf-images/icons/icon-applications-menu.png)), go to the *Control Panel* tab, and click *Objects*.

1. Verify these objects are present:

   * Distributor Application
   * Application Evaluation

1. In the Global Menu (![Global Menu](./pdf-images/icons/icon-applications-menu.png)), go to the *Control Panel* tab and click *Picklists*.

1. Verify these picklists are present:

   * Annual Purchase Volumes
   * Application States
   * Assessment Scores
   * Decisions
   * Distribution Channels
   * Distribution Regions
   * Product Types
   * Recommendations

1. In the Global Menu (![Global Menu](./pdf-images/icons/icon-applications-menu.png)), go to the *Control Panel* tab and click *Templates* under Notifications.

1. Verify these notification templates are present:

   * Application Approved, Applicant, Email
   * Application Denied, Applicant, Email
   * Application Received, Applicant, Email
   * Distributor Application Submitted, Admin, User

1. In the Global Menu (![Global Menu](./pdf-images/icons/icon-applications-menu.png)), go to the *Control Panel* tab and click *Roles*.

1. Verify these user roles are present:

   * Business Development Manager
   * Business Development Specialist

1. In the Global Menu (![Global Menu](./pdf-images/icons/icon-applications-menu.png)), go to the *Applications* tab and click *Process Builder*.

1. Verify the Distributor Manager Approval workflow is present.

Great! You've deployed the batch client extension and explored the Distributor Management app's content.
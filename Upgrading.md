# Upgrading the repo to a new Quarterly Release

The process to upgrade the repo to a later quarterly release is fairly straight forward, but it needs to be repeated in each exercise branch as well as the main branch.

So this document is going to cover the steps necessary to update a single branch...

1. Update `settings.gradle` to use the latest version of the workspace plugin (corresponding to the version of Gradle being used).

2. Update `gradle.properties` to use the newer version of quarterly release.

3. Delete the `bundles` directory if it already exists.

4. Use the `blade gw initBundle` command to create a new bundle using the new quarterly release.

5. Go into the `bundles/data/hypersonic` folder. Use the `javac Shutdown.java` command to build the tool to shut down the HSQL database server that we're about to start. Use the command `java -cp hsql.jar org.hsqldb.Server -database.0 file:lportal -dbname.0 lportal` to start up the standalone HSQL database server (necessary for the upgrade process to do its thing).

6. In another terminal, navigate to `bundles/tools/portal-tools-db-upgrade-client` folder and execute the `./db_upgrade_client.sh` script. The upgrade will likely leave you at the `g!` gogo prompt. Execute the command `upgrade:executeAll` followed by `verify:executeAll` and finally `quit`. These steps apply all pending upgrades and verifies the system is ready. Change to the `bundles/data/hypersonic` directory and execute the command `java -cp hsql.jar:. Shutdown` to shut down the standalone HSQL database service cleanly after the upgrade.

7. _Recommended_ Start the bundle, wait for the `Server startup` message, then shut down the bundle. This will complete the startup and indexing and may report startup exceptions due to indexing bugs. Start the bundle again and verify there are no exceptions from the startup. *Note:* The automated `ds:unsatisfied` was reporting component startup failures for me, but telnetting into the Gogo shell and running the command manually showed that everything was resolved correctly.

8. Copy the `bundles/data/hypersonic/lportal.*` files to `configs/local/data/hypersonic` to replace the prior versions.

9. Use `git add` on modified files and `git commit` to commit the changes to the branch and finish with `git push` to push the changes to the origin repo.

# Relay fixed copy

Fixed product language for the screen, email and push contracts in this directory. Maker descriptions and authored incident or conversation text remain derived fixture content; prices, metrics and dates enter these strings through placeholders.

For the Service contract on home, services and serviceDetail, a null `latencyMs` renders `services.latency.unobserved`, "No latency measurement", instead of numeric latency copy. A measured latency, including a genuine zero, renders with `ms`. Never substitute `0 ms` for null.

| Key | Copy | Shown when |
|---|---|---|
| home.title | Needs attention | home |
| home.documentTitle | Needs attention · Relay | home |
| nav.home | Home | home; services; serviceDetail; deploys; incidents; incidentThread; newService; settings; help |
| nav.deploys | Deploys | home; services; serviceDetail; deploys; incidents; incidentThread; newService; settings; help |
| nav.services | Services | home; services; serviceDetail; deploys; incidents; incidentThread; newService; settings; help |
| nav.incidents | Incidents | home; services; serviceDetail; deploys; incidents; incidentThread; newService; settings; help |
| nav.settings | Settings | home; services; serviceDetail; deploys; incidents; incidentThread; newService; settings; help |
| home.metrics.requests.label | Requests per minute | home · Current health; home · Refreshing health; home · Long incident and service names |
| home.metrics.latency.label | p95 latency | home · Current health; home · Refreshing health |
| home.metrics.errors.label | Error rate | home · Current health; home · Refreshing health |
| home.metrics.deploys.label | Deploys today | home · Current health; home · Refreshing health |
| home.incidents.heading | Needs attention | home · Current health; home · Refreshing health; home · Long incident and service names |
| home.incidents.viewService | View affected service | home · Current health; home · Refreshing health; home · Long incident and service names |
| home.incidents.open | Open incident | home · Current health; home · Refreshing health; home · Long incident and service names |
| home.empty.title | No services yet. | home · No registered services |
| home.empty.body | Register a repository before creating a rollout. | home · No registered services |
| home.empty.action | New service | home · No registered services |
| home.recovery.title | Service health could not be retrieved. | home · Health unavailable |
| home.recovery.action | Try again | home · Health unavailable |
| services.title | Services | services |
| services.documentTitle | Services · Relay | services |
| services.columns.name | Service | services · Registered services; services · Refreshing services; services · Long service identity; services · Recent deployment; services · Deployment hours ago; services · Deployment days ago; services · Deployment weeks ago |
| services.columns.health | Status | services · Registered services; services · Refreshing services; services · Long service identity; services · Recent deployment; services · Deployment hours ago; services · Deployment days ago; services · Deployment weeks ago |
| services.columns.region | Region | services · Registered services; services · Refreshing services; services · Long service identity; services · Recent deployment; services · Deployment hours ago; services · Deployment days ago; services · Deployment weeks ago |
| services.columns.latency | p95 latency | services · Registered services; services · Refreshing services; services · Long service identity; services · Recent deployment; services · Deployment hours ago; services · Deployment days ago; services · Deployment weeks ago |
| services.columns.lastDeploy | Last deploy | services · Registered services; services · Refreshing services; services · Long service identity; services · Recent deployment; services · Deployment hours ago; services · Deployment days ago; services · Deployment weeks ago |
| services.create | New service | services · Registered services; services · Refreshing services; services · No registered services; services · Long service identity |
| services.status.healthy | Healthy | services · Registered services; services · Refreshing services; services · Recent deployment |
| services.status.degraded | Degraded | services · Registered services; services · Refreshing services; services · Long service identity; services · Deployment hours ago |
| services.status.down | Down | services · Registered services; services · Refreshing services; services · Deployment days ago |
| services.status.paused | Paused | services · Registered services; services · Refreshing services; services · Deployment weeks ago |
| services.latency.unobserved | No latency measurement | home · Current health; home · Refreshing health; services · Registered services; services · Refreshing services; services · Deployment days ago; services · Deployment weeks ago; serviceDetail · Restarting instances; serviceDetail · Restart failed; serviceDetail · Notification service record; serviceDetail · Review restart |
| services.search.queryLabel | Search services | services |
| services.recovery.action | Reload services | services · Services unavailable |
| services.empty.title | No services yet. | services · No registered services |
| services.empty.body | Register a repository and region for the first service. | services · No registered services |
| services.empty.action | New service | services · No registered services |
| services.recovery.title | Services could not be loaded. | services · Services unavailable |
| serviceDetail.title | Service detail | serviceDetail |
| serviceDetail.documentTitle | Service detail · Relay | serviceDetail |
| serviceDetail.rollBack | Roll back | serviceDetail · Service record; serviceDetail · Review rollout; serviceDetail · Review rollback; serviceDetail · Long service and artifact names; serviceDetail · Deploy failed; serviceDetail · Rollback failed; serviceDetail · Restart failed |
| serviceDetail.restart | Restart service | serviceDetail · Notification service record; serviceDetail · Review restart; serviceDetail · Restart failed |
| serviceDetail.openIncident | View incident | serviceDetail · Service record; serviceDetail · Review rollout; serviceDetail · Review rollback; serviceDetail · Refreshing record; serviceDetail · Long service and artifact names; serviceDetail · Rolling out; serviceDetail · Rollout complete; serviceDetail · Deploy failed; serviceDetail · Rolling back; serviceDetail · Rollback complete; serviceDetail · Rollback failed; serviceDetail · Restarting instances; serviceDetail · Instances restarted; serviceDetail · Restart failed; serviceDetail · Notification service record; serviceDetail · Review restart |
| serviceDetail.recovery.heading | Deploy failed | serviceDetail · Deploy failed |
| serviceDetail.recovery.detail | Build step exited with code {exitCode} after {elapsedSeconds} s. The previous artifact is still serving traffic. | serviceDetail · Deploy failed |
| serviceDetail.recovery.action | Retry this artifact | serviceDetail · Deploy failed |
| serviceDetail.rollback.title | Roll back {service}? | serviceDetail · Review rollback |
| serviceDetail.rollback.body | Restore the last healthy artifact without rebuilding it. Current traffic shifts only after its health check passes. | serviceDetail · Review rollback |
| serviceDetail.rollback.confirm | Roll back | serviceDetail · Review rollback |
| serviceDetail.rollback.cancel | Keep current artifact | serviceDetail · Review rollback |
| serviceDetail.rollback.close | Close rollback review | serviceDetail · Review rollback |
| serviceDetail.status.deployed | Rollout complete. All batches passed their health checks. | serviceDetail · Rollout complete |
| deploys.title | Deploys | deploys |
| deploys.documentTitle | Deploys · Relay | deploys |
| deploys.stage.queued | Queued | deploys · Rollout history; deploys · Refreshing rollout history |
| deploys.stage.building | Building | deploys · Rollout history; deploys · Refreshing rollout history; deploys · Long release artifact |
| deploys.stage.rollingOut | Rolling out | deploys · Rollout history; deploys · Refreshing rollout history |
| deploys.stage.complete | Complete | deploys · Rollout history; deploys · Refreshing rollout history |
| deploys.stage.failed | Failed | deploys · Rollout history; deploys · Refreshing rollout history |
| deploys.empty.title | No deploys yet. | deploys · No rollout attempts |
| deploys.empty.body | Choose an artifact on a registered service to begin a rollout. | deploys · No rollout attempts |
| deploys.empty.action | View services | deploys · No rollout attempts |
| deploys.recovery.title | Rollout history could not be loaded. | deploys · Rollout history unavailable |
| deploys.recovery.action | Try again | deploys · Rollout history unavailable |
| incidents.title | Incidents | incidents |
| incidents.documentTitle | Incidents · Relay | incidents |
| incidents.empty.title | No open incidents. | incidents · No open incidents |
| incidents.empty.body | No incidents are currently recorded. Check measured service health before assuming every service is healthy. | incidents · No open incidents |
| incidents.empty.action | View services | incidents · No open incidents |
| incidents.recovery.title | Could not load incidents | incidents · Incidents unavailable |
| incidents.recovery.action | Try again | incidents · Incidents unavailable |
| incidentThread.title | Incident thread | incidentThread |
| incidentThread.documentTitle | Incident thread · Relay | incidentThread |
| incidentThread.composer.placeholder | Add an observation or recovery step | incidentThread · Incident timeline; incidentThread · Refreshing timeline; incidentThread · No observations; incidentThread · Long recovery observation; incidentThread · Observation recorded; incidentThread · Service recovered; incidentThread · Review incident resolution; incidentThread · Incident resolved; incidentThread · Resolution not recorded |
| incidentThread.send | Send update | incidentThread · Incident timeline; incidentThread · Refreshing timeline; incidentThread · No observations; incidentThread · Long recovery observation; incidentThread · Observation recorded; incidentThread · Observation not sent; incidentThread · Service recovered; incidentThread · Review incident resolution; incidentThread · Incident resolved; incidentThread · Resolution not recorded |
| incidentThread.aria.send | Send message | incidentThread · Incident timeline; incidentThread · Refreshing timeline; incidentThread · No observations; incidentThread · Long recovery observation; incidentThread · Observation recorded; incidentThread · Observation not sent; incidentThread · Service recovered; incidentThread · Review incident resolution; incidentThread · Incident resolved; incidentThread · Resolution not recorded |
| incidentThread.empty.title | No messages yet. | incidentThread · No observations |
| incidentThread.empty.body | Add the first observation; the incident and affected service stay beside the timeline. | incidentThread · No observations |
| incidentThread.empty.action | Write a message | incidentThread · No observations |
| incidentThread.recovery.title | The incident timeline could not be loaded. | incidentThread · Timeline unavailable |
| incidentThread.recovery.action | Try again | incidentThread · Timeline unavailable |
| newService.title | New service | newService |
| newService.documentTitle | New service · Relay | newService |
| newService.save | Create service | newService · Registration draft; newService · Invalid registration fields; newService · Registration region choices open; newService · Registration failed; newService · Long repository name |
| newService.cancel | Cancel | newService · Registration draft; newService · Invalid registration fields; newService · Registration region choices open; newService · Registration failed; newService · Long repository name |
| newService.status.saving | Registering service… | newService · Registering service |
| newService.recovery | The service was not registered. Your repository and region are still here. | newService · Registration failed |
| newService.name.label | Name | newService · Registration draft; newService · Invalid registration fields; newService · Registration region choices open; newService · Registering service; newService · Registration failed; newService · Long repository name |
| newService.name.placeholder | api-gateway | newService · Registration draft; newService · Invalid registration fields; newService · Registration region choices open |
| newService.region.label | Region | newService · Registration draft; newService · Invalid registration fields; newService · Registration region choices open; newService · Registering service; newService · Registration failed; newService · Long repository name |
| newService.region.east | us-east-1 | newService · Registration draft; newService · Invalid registration fields; newService · Registration region choices open; newService · Registering service; newService · Registration failed; newService · Long repository name |
| newService.region.west | us-west-2 | newService · Registration region choices open |
| newService.region.europe | eu-west-1 | newService · Registration region choices open |
| newService.autoDeploy.label | Auto-deploy on push | newService · Registration draft; newService · Invalid registration fields; newService · Registration region choices open; newService · Registering service; newService · Registration failed; newService · Long repository name |
| newService.failureNotifications.label | Notify on failure | newService · Registration draft; newService · Invalid registration fields; newService · Registration region choices open; newService · Registering service; newService · Registration failed; newService · Long repository name |
| newService.invalid | Enter a service name, repository and supported region before registering. | newService · Invalid registration fields |
| settings.title | Settings | settings |
| settings.documentTitle | Settings · Relay | settings |
| settings.section | Deploy preferences | settings |
| settings.save | Save preferences | settings · Editable; settings · Default-region choices open; settings · Saved; settings · Save failed |
| settings.cancel | Cancel | settings · Editable; settings · Default-region choices open; settings · Save failed |
| settings.status.saving | Saving preferences… | settings · Saving |
| settings.status.saved | Preferences saved. | settings · Saved |
| settings.recovery | Preferences were not saved. Your changes are still here. | settings · Save failed |
| settings.region.label | Default region | settings |
| settings.region.east | us-east-1 | settings |
| settings.region.west | us-west-2 | settings · Default-region choices open |
| settings.region.europe | eu-west-1 | settings · Default-region choices open |
| settings.autoDeploy.label | Auto-deploy on push | settings |
| settings.failureNotifications.label | Notify me when a deploy fails | settings |
| settings.healthAlerts.label | Notify me about unhealthy services | settings |
| help.title | Rollouts | help |
| help.documentTitle | Rollouts · Relay | help |
| help.rolloutPolicy | A rollout replaces instances in batches and stops at the first failed health check. Traffic shifts only when the new batch is healthy. | help |
| help.rollbackPolicy | Rollbacks reuse the previous artifact; nothing is rebuilt. | help |
| landing.title | The deploy system for small teams. | landing |
| landing.documentTitle | Relay · Service operations | landing |
| landing.description | Ship a service, follow each rollout batch, and investigate health changes with the on-call team. | landing |
| landing.action | Open service health | landing |
| landing.secondaryAction | Read rollout safety rules | landing |
| landing.footer | © Relay. All rights reserved. | landing |
| landing.navigation.services | Services | landing |
| landing.navigation.help | Rollout guide | landing |
| landing.navigation.deploys | Deploys | landing |
| landing.navigation.incidents | Incidents | landing |
| landing.rollouts.eyebrow | Deploys | landing |
| landing.rollouts.title | Roll out in batches. Stop at the first failure. | landing |
| landing.rollouts.body | Traffic moves only when the new batch passes its health check. Rollbacks reuse the previous artifact. | landing |
| landing.incidents.eyebrow | Incidents | landing |
| landing.incidents.title | Every incident, with the deploy that caused it. | landing |
| landing.incidents.body | Each incident keeps its affected service, on-call owner and recovery timeline together. | landing |
| landing.services.eyebrow | Services | landing |
| landing.services.title | One page per service. | landing |
| landing.services.body | Status, region, latency, recent deploys and the people on call, on one screen. | landing |
| landing.proof.deployCount.value | 2.4M | landing |
| landing.proof.deployCount.label | deploys | landing |
| landing.proof.rolloutSeconds.value | 48 s | landing |
| landing.proof.rolloutSeconds.label | median rollout | landing |
| landing.proof.uptime.value | 99.98% | landing |
| landing.proof.uptime.label | uptime | landing |
| landing.engineerQuote.text | We stopped writing deploy scripts. Relay is the deploy script. | landing |
| landing.engineerQuote.attribution | Maya Chen, CTO at Northwind | landing |
| landing.teamMarks.northwind.alt | Northwind | landing |
| landing.teamMarks.contoso.alt | Contoso | landing |
| landing.teamMarks.fabrikam.alt | Fabrikam | landing |
| landing.teamMarks.initech.alt | Initech | landing |
| landing.teamMarks.umbrella.alt | Umbrella | landing |
| landing.teamMarks.hooli.alt | Hooli | landing |
| emailDeployFailed.subject | Rollout failed: {artifact} on {service} | emailDeployFailed |
| emailDeployFailed.body | The build exited with code {exitCode} after {elapsedSeconds} s. Open this rollout to inspect the failure before retrying. | emailDeployFailed |
| emailDeployFailed.action | View failed rollout | emailDeployFailed |
| pushIncidentOpened.title | Incident opened for {service} | pushIncidentOpened |
| pushIncidentOpened.body | {title}. {owner} is on call. Open the incident to review the evidence. | pushIncidentOpened |
| pushIncidentOpened.action | Open incident | pushIncidentOpened |
| shell.aria.navigation | Main navigation | home; services; serviceDetail; deploys; incidents; incidentThread; newService; settings; help |
| shell.aria.main | Main content | home; services; serviceDetail; deploys; incidents; incidentThread; newService; settings; help; landing |
| shell.alt.productMark | Relay mark | home; services; serviceDetail; deploys; incidents; incidentThread; newService; settings; help; landing |
| home.metrics.requests.value | {value} requests/min | home · Current health; home · Refreshing health; home · Long incident and service names |
| home.metrics.latency.value | {value} ms | home · Current health; home · Refreshing health |
| home.metrics.errors.value | {value}% | home · Current health; home · Refreshing health |
| home.metrics.deploys.value | {value} deploys | home · Current health; home · Refreshing health |
| home.metrics.observedAt | Observed {observedAt:time} | home · Current health; home · Refreshing health; home · Long incident and service names |
| services.latency.value | {latencyMs} ms | home · Current health; home · Refreshing health; services · Registered services; services · Refreshing services; services · Long service identity; services · Recent deployment; services · Deployment hours ago |
| services.lastDeploy.relative | {lastDeployedAt:relative} | services · Registered services; services · Refreshing services; services · Recent deployment; services · Long service identity; services · Deployment hours ago; services · Deployment days ago; services · Deployment weeks ago |
| serviceDetail.deploy | Deploy artifact | serviceDetail · Service record; serviceDetail · Review rollout; serviceDetail · Review rollback; serviceDetail · Long service and artifact names; serviceDetail · Rollout complete; serviceDetail · Rollback complete; serviceDetail · Instances restarted; serviceDetail · Registered, not deployed; serviceDetail · Review first rollout |
| serviceDetail.latency.value | p95: {latencyMs} ms | serviceDetail · Service record; serviceDetail · Review rollout; serviceDetail · Review rollback; serviceDetail · Refreshing record; serviceDetail · Long service and artifact names; serviceDetail · Rolling out; serviceDetail · Rollout complete; serviceDetail · Deploy failed; serviceDetail · Rolling back; serviceDetail · Rollback complete; serviceDetail · Rollback failed; serviceDetail · Instances restarted |
| serviceDetail.artifact | Artifact: {artifact} | serviceDetail · Service record; serviceDetail · Review rollout; serviceDetail · Review rollback; serviceDetail · Refreshing record; serviceDetail · Long service and artifact names; serviceDetail · Rolling out; serviceDetail · Rollout complete; serviceDetail · Deploy failed; serviceDetail · Rolling back; serviceDetail · Rollback complete; serviceDetail · Rollback failed; serviceDetail · Restarting instances; serviceDetail · Instances restarted; serviceDetail · Restart failed; serviceDetail · Registered, not deployed; serviceDetail · Review first rollout; serviceDetail · Notification service record; serviceDetail · Review restart |
| serviceDetail.progress | Rollout: {progressPercent}% | serviceDetail · Service record; serviceDetail · Review rollout; serviceDetail · Review rollback; serviceDetail · Refreshing record; serviceDetail · Long service and artifact names; serviceDetail · Rolling out; serviceDetail · Rollout complete; serviceDetail · Deploy failed; serviceDetail · Rolling back; serviceDetail · Rollback complete; serviceDetail · Rollback failed; serviceDetail · Restarting instances; serviceDetail · Instances restarted; serviceDetail · Restart failed; serviceDetail · Notification service record; serviceDetail · Review restart |
| serviceDetail.startedAt | Started {startedAt:time} | serviceDetail · Service record; serviceDetail · Review rollout; serviceDetail · Review rollback; serviceDetail · Refreshing record; serviceDetail · Long service and artifact names; serviceDetail · Rolling out; serviceDetail · Rollout complete; serviceDetail · Deploy failed; serviceDetail · Rolling back; serviceDetail · Rollback complete; serviceDetail · Rollback failed; serviceDetail · Restarting instances; serviceDetail · Instances restarted; serviceDetail · Restart failed; serviceDetail · Notification service record; serviceDetail · Review restart |
| serviceDetail.loadFailure | Service details could not be loaded. | serviceDetail · Record unavailable |
| serviceDetail.loadRetry | Reload service | serviceDetail · Record unavailable |
| serviceDetail.missing.title | This service is no longer registered. | serviceDetail · Service removed |
| serviceDetail.missing.action | View services | serviceDetail · Service removed |
| serviceDetail.deployReview.title | Deploy {artifact} to {service}? | serviceDetail · Review rollout; serviceDetail · Review first rollout |
| serviceDetail.deployReview.body | Traffic moves in batches only after each health check passes. A failed batch stops the rollout. | serviceDetail · Review rollout; serviceDetail · Review first rollout |
| serviceDetail.deployReview.confirm | Start rollout | serviceDetail · Review rollout; serviceDetail · Review first rollout |
| serviceDetail.deployReview.cancel | Keep current artifact | serviceDetail · Review rollout |
| serviceDetail.firstDeployReview.cancel | Not now | serviceDetail · Review first rollout |
| serviceDetail.deployReview.close | Close rollout review | serviceDetail · Review rollout; serviceDetail · Review first rollout |
| serviceDetail.restartReview.title | Restart {service}? | serviceDetail · Review restart |
| serviceDetail.restartReview.body | Replace unhealthy instances with the current artifact. Healthy instances continue serving traffic during replacement. | serviceDetail · Review restart |
| serviceDetail.restartReview.confirm | Restart instances | serviceDetail · Review restart |
| serviceDetail.restartReview.cancel | Keep watching | serviceDetail · Review restart |
| serviceDetail.restartReview.close | Close restart review | serviceDetail · Review restart |
| serviceDetail.status.deploying | Rolling out the selected artifact… | serviceDetail · Rolling out |
| serviceDetail.status.rollingBack | Restoring the last healthy artifact… | serviceDetail · Rolling back |
| serviceDetail.status.rolledBack | Previous artifact restored. Health checks are passing. | serviceDetail · Rollback complete |
| serviceDetail.rollbackFailure | Rollback stopped at a failed health check. The current artifact remains active. | serviceDetail · Rollback failed |
| serviceDetail.retryRollback | Retry rollback | serviceDetail · Rollback failed |
| serviceDetail.status.restarting | Replacing unhealthy instances… | serviceDetail · Restarting instances |
| serviceDetail.status.restarted | Instances restarted. Health checks are passing. | serviceDetail · Instances restarted |
| serviceDetail.restartFailure | Replacement instances did not pass their health checks. Healthy instances are still serving traffic. | serviceDetail · Restart failed |
| serviceDetail.retryRestart | Retry restart | serviceDetail · Restart failed |
| deploys.inspect | View rollout | deploys · Rollout history; deploys · Refreshing rollout history; deploys · Long release artifact |
| deploys.artifact | {artifact} on {service} | deploys · Rollout history; deploys · Refreshing rollout history; deploys · Long release artifact |
| deploys.progress | {progressPercent}% complete | deploys · Rollout history; deploys · Refreshing rollout history; deploys · Long release artifact |
| deploys.startedAt | Started {startedAt:time} | deploys · Rollout history; deploys · Refreshing rollout history; deploys · Long release artifact |
| incidents.columns.service | Service | incidents · Open incidents; incidents · Refreshing incidents; incidents · Long incident evidence; incidents · Resolved incident |
| incidents.columns.owner | On call | incidents · Open incidents; incidents · Refreshing incidents; incidents · Long incident evidence; incidents · Resolved incident |
| incidents.columns.status | Status | incidents · Open incidents; incidents · Refreshing incidents; incidents · Long incident evidence; incidents · Resolved incident |
| incidents.status.open | Open | incidents · Open incidents; incidents · Refreshing incidents; incidents · Long incident evidence |
| incidents.status.resolved | Resolved | incidents · Resolved incident |
| incidents.openedAt | Opened {openedAt:time} | incidents · Open incidents; incidents · Refreshing incidents; incidents · Long incident evidence; incidents · Resolved incident |
| incidentThread.sentAt | Sent {sentAt:time} | incidentThread · Incident timeline; incidentThread · Refreshing timeline; incidentThread · Long recovery observation; incidentThread · Sending observation; incidentThread · Observation recorded; incidentThread · Observation not sent; incidentThread · Service recovered; incidentThread · Review incident resolution; incidentThread · Recording resolution; incidentThread · Incident resolved; incidentThread · Resolution not recorded |
| incidentThread.sender.you | You | incidentThread · Incident timeline; incidentThread · Refreshing timeline; incidentThread · Sending observation; incidentThread · Observation recorded; incidentThread · Observation not sent; incidentThread · Service recovered; incidentThread · Review incident resolution; incidentThread · Recording resolution; incidentThread · Incident resolved; incidentThread · Resolution not recorded |
| incidentThread.status.sending | Sending your incident update… | incidentThread · Sending observation |
| incidentThread.status.sent | Update added to the incident timeline. | incidentThread · Observation recorded |
| incidentThread.sendFailure | The update was not sent. Your draft is still here. | incidentThread · Observation not sent |
| incidentThread.retrySend | Send update again | incidentThread · Observation not sent |
| incidentThread.resolve | Resolve incident | incidentThread · Service recovered; incidentThread · Review incident resolution; incidentThread · Resolution not recorded |
| incidentThread.resolveReview.title | Resolve {title}? | incidentThread · Review incident resolution |
| incidentThread.resolveReview.body | Confirm that the affected service is healthy and record the recovery in this incident’s timeline. | incidentThread · Review incident resolution |
| incidentThread.resolveReview.confirm | Mark resolved | incidentThread · Review incident resolution |
| incidentThread.resolveReview.cancel | Keep incident open | incidentThread · Review incident resolution |
| incidentThread.resolveReview.close | Close resolution review | incidentThread · Review incident resolution |
| incidentThread.status.resolving | Recording the incident resolution… | incidentThread · Recording resolution |
| incidentThread.status.resolved | Incident resolved. Its timeline remains available. | incidentThread · Incident resolved |
| incidentThread.resolveFailure | Resolution was not recorded. The incident is still open. | incidentThread · Resolution not recorded |
| incidentThread.retryResolve | Retry resolution | incidentThread · Resolution not recorded |
| newService.repository.label | Repository | newService · Registration draft; newService · Invalid registration fields; newService · Registration region choices open; newService · Registering service; newService · Registration failed; newService · Long repository name |
| newService.repository.placeholder | team/service-repository | newService · Registration draft; newService · Invalid registration fields; newService · Registration region choices open |
| newService.status.saved | Service registered. Choose an artifact to start its first rollout. | newService · Service registered |
| newService.result | Open registered service | newService · Service registered |
| emailDeployFailed.preheader | The existing artifact is still serving traffic. | emailDeployFailed |
| incidentThread.outcome | This incident is recorded as resolved. | incidentThread · Incident resolved |
| serviceDetail.servingArtifact | Serving artifact: {activeArtifact} | serviceDetail · Service record; serviceDetail · Review rollout; serviceDetail · Review rollback; serviceDetail · Refreshing record; serviceDetail · Long service and artifact names; serviceDetail · Rolling out; serviceDetail · Rollout complete; serviceDetail · Deploy failed; serviceDetail · Rolling back; serviceDetail · Rollback complete; serviceDetail · Rollback failed; serviceDetail · Restarting instances; serviceDetail · Instances restarted; serviceDetail · Restart failed; serviceDetail · Notification service record; serviceDetail · Review restart |

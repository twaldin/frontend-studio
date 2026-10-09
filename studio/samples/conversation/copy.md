# Plover fixed copy

This is an invented product definition, not a claim that the current studio implements its capabilities. Fixed product language is keyed here; maker content, agent output, recording notes, dates and counts belong in typed fixtures. The reach column follows the model’s state and setup references.

| Key | Copy | Shown when |
|---|---|---|
| chats.title | Chats | chats |
| chats.documentTitle | Chats · Plover | chats |
| shell.aria.navigation | Main navigation | chats; thread; agents; newAgent; settings; help; landing |
| shell.aria.main | Main content | chats; thread; agents; newAgent; settings; help; landing |
| shell.alt.productMark | Plover mark | chats; thread; agents; newAgent; settings; help; landing |
| chats.new | New chat | chats |
| chats.queryLabel | Search chats | chats |
| chats.kind.agent | Agent | chats |
| chats.kind.team | Team | chats |
| nav.chats | Chats | chats; thread; agents; newAgent; settings; help |
| nav.agents | Agents | chats; thread; agents; newAgent; settings; help |
| nav.settings | Settings | chats; thread; agents; newAgent; settings; help |
| chats.empty.title | No chats yet. | chats · Empty |
| chats.empty.body | Start a chat with an agent, or pull a teammate into a thread. | chats · Empty |
| chats.empty.action | New chat | chats · Empty |
| chats.recovery.title | Your chats could not be loaded. | chats · Failed |
| chats.recovery.action | Try again | chats · Failed |
| thread.title | Conversation | thread |
| thread.documentTitle | Conversation · Plover | thread |
| thread.recovery.heading | Plover could not finish this answer. | thread · Response failed |
| thread.recovery.detail | Your question is kept here. The failed read did not return a result. | thread · Response failed |
| thread.recovery.action | Retry this answer | thread · Response failed |
| thread.composer.placeholder | Ask Plover a question for this conversation | thread · Ready; thread · Choose teammate; thread · Responding; thread · Needs approval; thread · Review read scope; thread · Running approved read; thread · Answer complete; thread · Stopping response; thread · Response stopped; thread · Read denied; thread · Sharing thread; thread · Thread shared; thread · Sharing failed; thread · Long answer; thread · New conversation; thread · Stop failed |
| thread.send | Send | thread · Ready; thread · Choose teammate; thread · Answer complete; thread · Response stopped; thread · Response failed; thread · Read denied; thread · Thread shared; thread · Sharing failed; thread · Long answer; thread · Sending question; thread · New conversation; thread · Question not sent |
| thread.stop | Stop response | thread · Responding; thread · Running approved read |
| thread.approval.allowOnce | Allow once | thread · Needs approval; thread · Review read scope |
| thread.approval.allowAlways | Always allow this read scope | thread · Needs approval; thread · Review read scope |
| thread.approval.deny | Deny | thread · Needs approval; thread · Review read scope |
| thread.approval.heading | Allow this read scope? | thread · Needs approval; thread · Review read scope |
| thread.status.generating | Plover is responding… | thread · Responding |
| thread.status.stopped | Response stopped. The partial answer is kept here. | thread · Response stopped |
| thread.share | Share thread | thread · Ready; thread · Choose teammate; thread · Answer complete; thread · Response stopped; thread · Thread shared; thread · Sharing failed; thread · Long answer |
| thread.aria.messages | Conversation messages | thread |
| thread.outcome | This thread is shared with {recipient}. | thread · Thread shared |
| agents.title | Agents | agents |
| agents.documentTitle | Agents · Plover | agents |
| agents.columns.name | Agent | agents · Ready; agents · Loading; agents · Long content; agents · New agent listed |
| agents.columns.status | Status | agents · Ready; agents · Loading; agents · Long content; agents · New agent listed |
| agents.columns.runs | Runs today | agents · Ready; agents · Loading; agents · Long content; agents · New agent listed |
| agents.columns.medianReply | Median reply | agents · Ready; agents · Loading; agents · Long content; agents · New agent listed |
| agents.columns.lastActive | Last active | agents · Ready; agents · Loading; agents · Long content; agents · New agent listed |
| agents.status.active | Active | agents · Ready; agents · Loading; agents · Long content; agents · New agent listed |
| agents.status.idle | Idle | agents · Ready; agents · Loading; agents · New agent listed |
| agents.status.needsAccess | Needs access | agents · Ready; agents · Loading; agents · New agent listed |
| agents.status.failing | Failing | agents · Ready; agents · Loading; agents · New agent listed |
| agents.status.paused | Paused | agents · Ready; agents · Loading; agents · New agent listed |
| agents.new | New agent | agents |
| agents.empty.title | No agents yet. | agents · Empty |
| agents.empty.body | Create an agent and choose which tools it can request. | agents · Empty |
| agents.empty.action | New agent | agents · Empty |
| agents.recovery.title | Could not load agents | agents · Failed |
| agents.recovery.action | Try again | agents · Failed |
| newAgent.title | New agent | newAgent |
| newAgent.documentTitle | New agent · Plover | newAgent |
| newAgent.save | Create agent | newAgent · Draft; newAgent · Field invalid; newAgent · Failed; newAgent · Long content |
| newAgent.cancel | Cancel | newAgent · Draft; newAgent · Field invalid; newAgent · Saving; newAgent · Failed; newAgent · Long content |
| newAgent.status | Creating the agent… | newAgent · Saving |
| newAgent.recovery | The agent was not created. Its configuration is still here. | newAgent · Failed |
| newAgent.name.label | Name | newAgent · Draft; newAgent · Field invalid; newAgent · Saving; newAgent · Failed; newAgent · Long content |
| newAgent.name.placeholder | researcher | newAgent · Draft; newAgent · Field invalid |
| newAgent.responseSpeed.label | Speed | newAgent · Draft; newAgent · Field invalid; newAgent · Saving; newAgent · Failed; newAgent · Long content |
| newAgent.responseSpeed.fast | Fast | newAgent · Draft; newAgent · Field invalid; newAgent · Saving; newAgent · Failed; newAgent · Long content |
| newAgent.responseSpeed.balanced | Balanced | newAgent · Draft; newAgent · Field invalid; newAgent · Saving; newAgent · Failed; newAgent · Long content |
| newAgent.responseSpeed.thorough | Thorough | newAgent · Draft; newAgent · Field invalid; newAgent · Saving; newAgent · Failed; newAgent · Long content |
| newAgent.approvalPolicy.label | Every data read requires scope-specific approval. | newAgent · Draft; newAgent · Field invalid; newAgent · Saving; newAgent · Failed; newAgent · Long content |
| newAgent.teamVisible.label | Share with the team | newAgent · Draft; newAgent · Field invalid; newAgent · Saving; newAgent · Failed; newAgent · Long content |
| newAgent.invalid | Give this agent a name before creating it. | newAgent · Field invalid |
| settings.title | Settings | settings |
| settings.documentTitle | Settings · Plover | settings |
| settings.section | Conversations and tools | settings |
| settings.save | Save preferences | settings |
| settings.cancel | Cancel | settings |
| settings.status.saving | Saving preferences… | settings · Saving |
| settings.status.saved | Preferences saved. | settings · Saved |
| settings.recovery | Preferences were not saved. Your changes are still here. | settings · Failed |
| settings.mentionNotifications.label | Notify me when a teammate mentions me | settings |
| settings.approvalNotifications.label | Notify me when an agent needs tool approval | settings |
| settings.approvalPolicy.detail | Plover always asks before a new read scope is used. Notification preferences do not grant access. | settings |
| settings.shareByDefault.label | Keep new chats private until shared | settings |
| settings.responseSpeed.label | Default response speed | settings |
| settings.responseSpeed.fast | Fast | settings |
| settings.responseSpeed.balanced | Balanced | settings |
| settings.responseSpeed.thorough | Thorough | settings |
| help.title | How agents use tools | help |
| help.documentTitle | How agents use tools · Plover | help |
| help.behavior | Plover pauses before a tool reads your data. Inspect the exact call and scope, allow that call once or grant that scope for future reads, or deny it without running the tool. | help |
| help.safety | A shared thread shows the same accepted messages, calls and results to its teammates. A stopped or failed answer stays marked incomplete. | help |
| landing.title | Chat with an agent. Bring your team into the thread. | landing |
| landing.documentTitle | Plover · Inspectable team conversations | landing |
| landing.description | Plover answers in the same thread your team is in, shows every tool it runs, and asks before it touches your data. | landing |
| landing.action | Open Chats | landing |
| landing.secondaryAction | How read approvals work | landing |
| landing.footer | © Plover. All rights reserved. | landing |
| landing.navigation.product | Product | landing |
| landing.navigation.agents | Agents | landing |
| landing.navigation.help | Read approvals | landing |
| landing.navigation.chats | Chats | landing |
| landing.toolTrace.eyebrow | Agents | landing |
| landing.toolTrace.title | An agent that shows its work. | landing |
| landing.toolTrace.body | Each requested query appears with its read scope. Allow it once, grant that scope for future reads, or deny it before execution. | landing |
| landing.teamThreads.eyebrow | Threads | landing |
| landing.teamThreads.title | Your team joins the same conversation. | landing |
| landing.teamThreads.body | Share a saved conversation with a teammate. They see the same accepted messages, agent calls and results. | landing |
| landing.savedThreads.eyebrow | Saved threads | landing |
| landing.savedThreads.title | Keep the question and its answer together. | landing |
| landing.savedThreads.body | Saved conversations retain prompts, read scopes and tool results so the team can return to the reasoning later. | landing |
| landing.visibleQueries.value | Exact calls | landing |
| landing.visibleQueries.label | queries visible in the thread | landing |
| landing.sharedResults.value | One conversation | landing |
| landing.sharedResults.label | the same result for your team | landing |
| landing.scopedApproval.value | Your approval | landing |
| landing.scopedApproval.label | before any data read | landing |
| landing.danaQuote.text | I stopped forwarding query results. The agent runs it in the thread and everyone sees the same numbers. | landing |
| landing.danaQuote.who | Dana Ortiz, head of growth at Alder & Finch | landing |
| landing.alderAndFinch.alt | Alder & Finch | landing |
| landing.brightwater.alt | Brightwater | landing |
| landing.calloway.alt | Calloway | landing |
| landing.dunmore.alt | Dunmore | landing |
| landing.eastgate.alt | Eastgate | landing |
| landing.fernhill.alt | Fernhill | landing |
| emailThreadShared.subject | A conversation was shared with you | emailThreadShared |
| emailThreadShared.body | You can now read {title}. Open the conversation to see the accepted messages, calls and results. | emailThreadShared |
| emailThreadShared.action | Open in Plover | emailThreadShared |
| pushApprovalNeeded.title | A read scope needs your approval | pushApprovalNeeded |
| pushApprovalNeeded.body | Review {name} and its requested scope before Plover reads any data. | pushApprovalNeeded |
| pushApprovalNeeded.action | Open in Plover | pushApprovalNeeded |
| chats.lastActive | Active {lastActiveAt} | chats · Ready; chats · Loading; chats · Long content |
| chats.unreadCount | {unread} unread messages | chats · Ready; chats · Loading; chats · Long content |
| thread.approval.close | Close read-scope review | thread · Needs approval; thread · Review read scope |
| thread.status.sending | Sending your question… | thread · Sending question |
| thread.status.toolRunning | Running the approved read… | thread · Running approved read |
| thread.status.completed | Answer complete. The call and its result are in this thread. | thread · Answer complete |
| thread.status.stopping | Stopping the response… | thread · Stopping response |
| thread.approval.denied | The read was denied. No tool result was produced. | thread · Read denied |
| thread.timestamp | Sent {sentAt} | thread · Ready; thread · Choose teammate; thread · Sending question; thread · Responding; thread · Needs approval; thread · Review read scope; thread · Running approved read; thread · Answer complete; thread · Stopping response; thread · Response stopped; thread · Response failed; thread · Read denied; thread · Sharing thread; thread · Thread shared; thread · Sharing failed; thread · Long answer; thread · Question not sent; thread · Stop failed |
| thread.tool.scope | Requested read scope: {scope} | thread · Ready; thread · Choose teammate; thread · Needs approval; thread · Review read scope; thread · Running approved read; thread · Answer complete; thread · Response failed; thread · Read denied; thread · Sharing thread; thread · Thread shared; thread · Sharing failed; thread · Long answer; thread · Question not sent; thread · Stop failed |
| thread.tool.result | Tool result: {result} | thread · Ready; thread · Choose teammate; thread · Answer complete; thread · Sharing thread; thread · Thread shared; thread · Sharing failed; thread · Long answer; thread · Question not sent |
| thread.share.recipient | Teammate | thread · Choose teammate; thread · Sharing thread; thread · Thread shared; thread · Sharing failed |
| thread.share.commit | Share this thread | thread · Choose teammate |
| thread.share.cancel | Keep private | thread · Choose teammate |
| thread.status.sharing | Sharing this thread… | thread · Sharing thread |
| thread.share.recovery | The thread was not shared. Your teammate choice is still here. | thread · Sharing failed |
| thread.share.retry | Retry sharing | thread · Sharing failed |
| agents.replyDuration | {medianReplySeconds} s | agents · Ready; agents · Loading; agents · Long content; agents · New agent listed |
| agents.lastActive | Active {lastActiveAt} | agents · Ready; agents · Loading; agents · Long content; agents · New agent listed |
| newAgent.outcome | The agent was created. Read scopes still require approval. | newAgent · Saved |
| newAgent.openAgents | Open Agents | newAgent · Saved |
| emailThreadShared.preheader | Read the same conversation and inspect its tool results. | emailThreadShared |
| thread.empty | Ask Plover a question to start this conversation. | thread · New conversation |
| thread.sendFailure | Your question was not sent. The prompt is still here. | thread · Question not sent |
| thread.sendRetry | Retry sending this question | thread · Question not sent |
| thread.stop.recovery | The stop request was not confirmed. The response may still be running. | thread · Stop failed |
| thread.stop.retry | Request stop again | thread · Stop failed |

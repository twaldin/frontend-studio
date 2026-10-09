# Marigold fixed copy

This is an invented product definition, not a claim that the current studio implements its capabilities. Fixed product language is keyed here; maker content, agent output, recording notes, dates and counts belong in typed fixtures. The reach column follows the model’s state and setup references.

| Key | Copy | Shown when |
|---|---|---|
| home.title | Home | home |
| home.documentTitle | Home · Marigold | home |
| shell.aria.navigation | Main navigation | home; library; player; downloads; queue; newPlaylist; settings; help; landing; episodeComments |
| shell.aria.main | Main content | home; library; player; downloads; queue; newPlaylist; settings; help; landing; episodeComments |
| shell.alt.productMark | Marigold mark | home; library; player; downloads; queue; newPlaylist; settings; help; landing; episodeComments |
| home.resume | Resume | home · Ready; home · Loading; home · Long content |
| home.featured | Featured recordings | home · Ready; home · Loading |
| home.newThisWeek | New this week | home · Ready; home · Loading |
| home.play | Play | home · Ready; home · Loading |
| home.newPlaylist | New playlist | home |
| nav.home | Home | home; library; player; downloads; queue; newPlaylist; settings; help; episodeComments |
| nav.library | Library | home; library; player; downloads; queue; newPlaylist; settings; help; episodeComments |
| nav.queue | Queue | home; library; player; downloads; queue; newPlaylist; settings; help; episodeComments |
| nav.downloads | Downloads | home; library; player; downloads; queue; newPlaylist; settings; help; episodeComments |
| nav.settings | Settings | home; library; player; downloads; queue; newPlaylist; settings; help; episodeComments |
| home.empty.title | Nothing to resume yet. | home · Empty |
| home.empty.body | Choose a song or episode from your library to start listening. | home · Empty |
| home.empty.action | Open Library | home · Empty |
| home.recovery.title | Your listening picks could not be loaded. | home · Failed |
| home.recovery.action | Try again | home · Failed |
| library.title | Library | library |
| library.documentTitle | Library · Marigold | library |
| library.columns.title | Title | library · Ready; library · Loading; library · Long content; library · New playlist listed |
| library.columns.creator | Creator | library · Ready; library · Loading; library · Long content; library · New playlist listed |
| library.columns.duration | Length | library · Ready; library · Loading; library · Long content; library · New playlist listed |
| library.columns.download | Download | library · Ready; library · Loading; library · Long content; library · New playlist listed |
| library.columns.lastPlayed | Last played | library · Ready; library · Loading; library · Long content; library · New playlist listed |
| library.queryLabel | Search songs, podcasts and artists | library |
| library.kind.album | Album | library |
| library.kind.song | Song | library |
| library.kind.podcast | Podcast | library |
| library.kind.live | Live | library |
| library.kind.playlist | Playlist | library |
| library.empty.title | Your library is empty. | library · Empty |
| library.empty.body | Save an album or follow a podcast to find it here. | library · Empty |
| library.empty.action | Browse Home | library · Empty |
| library.recovery.title | Could not load library | library · Failed |
| library.recovery.action | Try again | library · Failed |
| player.title | Now playing | player |
| player.documentTitle | Now playing · Marigold | player |
| player.play | Play | player · Paused; player · Recording finished; player · Long episode title |
| player.pause | Pause | player · Playing; player · Playing offline; player · Buffering |
| player.previous | Previous track | player · Paused; player · Buffering; player · Playing; player · Playing offline; player · Recording finished; player · Long episode title |
| player.next | Next track | player · Paused; player · Buffering; player · Playing; player · Playing offline; player · Recording finished; player · Long episode title |
| player.seek.aria | Listening position | player · Paused; player · Buffering; player · Playing; player · Playing offline; player · Recording finished; player · Long episode title |
| player.volume.aria | Volume | player · Paused; player · Buffering; player · Playing; player · Playing offline; player · Recording finished; player · Long episode title |
| player.queue | Open queue | player |
| player.playbackSpeed | Playback speed | player · Paused; player · Buffering; player · Playing; player · Playing offline; player · Recording finished; player · Long episode title |
| player.offline.title | Can’t play {title} | player · Not downloaded offline |
| player.offline.body | You’re offline and this recording is not downloaded. Your listening position is kept. | player · Not downloaded offline |
| player.offline.action | Open Downloads | player · Not downloaded offline |
| downloads.title | Downloads | downloads |
| downloads.documentTitle | Downloads · Marigold | downloads |
| download.status.notDownloaded | Not downloaded | library · Ready; library · Loading; library · New playlist listed; downloads · Download failed |
| download.status.downloaded | Downloaded | library · Ready; library · Loading; library · Long content; library · New playlist listed; downloads · Downloads ready; downloads · Remove selected downloads; downloads · Download complete; downloads · Removing downloads; downloads · Removal failed; downloads · Long download title |
| download.status.downloading | Downloading | library · Ready; library · Loading; library · New playlist listed; downloads · Downloads ready; downloads · Remove selected downloads; downloads · Downloading recording; downloads · Removing downloads; downloads · Downloads removed; downloads · Removal failed |
| download.status.unavailable | Unavailable | downloads · Downloads ready; downloads · Remove selected downloads; downloads · Removing downloads; downloads · Downloads removed; downloads · Removal failed |
| downloads.download | Download | downloads · Downloads ready; downloads · Remove selected downloads; downloads · Download failed; downloads · Downloads removed; downloads · Removal failed |
| downloads.remove | Remove download | downloads · Downloads ready; downloads · Remove selected downloads; downloads · Download complete; downloads · Removal failed; downloads · Long download title |
| downloads.recovery.action | Load downloads again | downloads · Downloads could not load |
| downloads.empty.title | Nothing downloaded yet. | downloads · No downloads |
| downloads.empty.body | Download songs and episodes and they play without a connection. | downloads · No downloads |
| downloads.empty.action | Browse your library | downloads · No downloads |
| downloads.recovery.title | Downloads could not be loaded. | downloads · Downloads could not load |
| downloads.confirmation.title | Remove downloads? | downloads · Remove selected downloads |
| downloads.confirmation.body | Remove {count} downloaded recordings from this device? Their library entries and listening positions will be kept. | downloads · Remove selected downloads |
| downloads.confirmation.confirm | Remove | downloads · Remove selected downloads |
| downloads.confirmation.cancel | Keep | downloads · Remove selected downloads |
| downloads.confirmation.close | Close confirmation | downloads · Remove selected downloads |
| downloads.outcome | {title} is ready for offline listening. | downloads · Download complete |
| queue.title | Queue | queue |
| queue.documentTitle | Queue · Marigold | queue |
| queue.moveUp | Move earlier | queue · Ready; queue · Loading; queue · Long content; queue · Saving queue; queue · Queue saved; queue · Queue change failed |
| queue.moveDown | Move later | queue · Ready; queue · Loading; queue · Long content; queue · Saving queue; queue · Queue saved; queue · Queue change failed |
| queue.remove | Remove from queue | queue · Ready; queue · Loading; queue · Long content; queue · Saving queue; queue · Queue saved; queue · Queue change failed |
| queue.playNext | Play next | queue · Ready; queue · Loading; queue · Long content; queue · Saving queue; queue · Queue saved; queue · Queue change failed |
| queue.empty.title | Your queue is empty. | queue · Empty |
| queue.empty.body | Add a song or episode from your library. | queue · Empty |
| queue.empty.action | Browse library | queue · Empty |
| queue.recovery.title | Could not load queue | queue · Failed |
| queue.recovery.action | Try again | queue · Failed |
| newPlaylist.title | New playlist | newPlaylist |
| newPlaylist.documentTitle | New playlist · Marigold | newPlaylist |
| newPlaylist.save | Create playlist | newPlaylist · Draft; newPlaylist · Field invalid; newPlaylist · Failed; newPlaylist · Long content |
| newPlaylist.cancel | Cancel | newPlaylist · Draft; newPlaylist · Field invalid; newPlaylist · Saving; newPlaylist · Failed; newPlaylist · Long content |
| newPlaylist.status | Creating your playlist… | newPlaylist · Saving |
| newPlaylist.recovery | The playlist was not created. Its name and choices are still here. | newPlaylist · Failed |
| newPlaylist.name.label | Name | newPlaylist · Draft; newPlaylist · Field invalid; newPlaylist · Saving; newPlaylist · Failed; newPlaylist · Long content |
| newPlaylist.name.placeholder | Slow mornings | newPlaylist · Draft; newPlaylist · Field invalid |
| newPlaylist.visibility.label | Visibility | newPlaylist · Draft; newPlaylist · Field invalid; newPlaylist · Saving; newPlaylist · Failed; newPlaylist · Long content |
| newPlaylist.visibility.private | Private | newPlaylist · Draft; newPlaylist · Field invalid; newPlaylist · Saving; newPlaylist · Failed; newPlaylist · Long content |
| newPlaylist.visibility.friends | Friends | newPlaylist · Draft; newPlaylist · Field invalid; newPlaylist · Saving; newPlaylist · Failed; newPlaylist · Long content |
| newPlaylist.visibility.public | Public | newPlaylist · Draft; newPlaylist · Field invalid; newPlaylist · Saving; newPlaylist · Failed; newPlaylist · Long content |
| newPlaylist.offline.label | Download for offline | newPlaylist · Draft; newPlaylist · Field invalid; newPlaylist · Saving; newPlaylist · Failed; newPlaylist · Long content |
| newPlaylist.appendPlayed.label | Add songs I play next | newPlaylist · Draft; newPlaylist · Field invalid; newPlaylist · Saving; newPlaylist · Failed; newPlaylist · Long content |
| newPlaylist.invalid | Give the playlist a name before creating it. | newPlaylist · Field invalid |
| settings.title | Settings | settings |
| settings.documentTitle | Settings · Marigold | settings |
| settings.section | Listening and downloads | settings |
| settings.save | Save preferences | settings |
| settings.cancel | Cancel | settings |
| settings.status.saving | Saving preferences… | settings · Saving |
| settings.status.saved | Preferences saved. | settings · Saved |
| settings.recovery | Preferences were not saved. Your changes are still here. | settings · Failed |
| settings.downloadWifi.label | Download only on Wi-Fi | settings |
| settings.downloadCharging.label | Finish downloads while charging | settings |
| settings.removeFinished.label | Remove finished episodes when space is low | settings |
| settings.rememberPosition.label | Remember my listening position | settings |
| settings.visibility.label | Default playlist visibility | settings |
| settings.visibility.private | Private | settings |
| settings.visibility.friends | Friends | settings |
| settings.visibility.public | Public | settings |
| help.title | Offline listening | help |
| help.documentTitle | Offline listening · Marigold | help |
| help.behavior | Only completed downloads play without a connection. Wi-Fi and charging preferences control when a transfer may run; a downloading recording is not yet ready offline. | help |
| help.safety | Removing a download frees local storage without removing the recording from your library or resetting its listening position. | help |
| landing.title | Your music and podcasts, in one library. | landing |
| landing.documentTitle | Marigold · Music and episodes together | landing |
| landing.description | Marigold keeps your place in every song and episode, downloads what you'll want offline, and picks up on any device you sign in to. | landing |
| landing.action | Open listening Home | landing |
| landing.secondaryAction | How offline listening works | landing |
| landing.footer | © Marigold. All rights reserved. | landing |
| landing.navigation.listen | Listen | landing |
| landing.navigation.podcasts | Podcasts | landing |
| landing.navigation.offline | Offline | landing |
| landing.navigation.help | Offline help | landing |
| landing.library.eyebrow | Library | landing |
| landing.library.title | Songs, shows and radio in one place. | landing |
| landing.library.body | Keep saved albums, songs and episodes together. Search your library by recording title or creator. | landing |
| landing.offline.eyebrow | Offline | landing |
| landing.offline.title | Download once, play anywhere. | landing |
| landing.offline.body | Choose recordings to download, then wait for the completed status before listening offline. Download conditions follow your Wi-Fi and charging preferences. | landing |
| landing.resume.eyebrow | Queue | landing |
| landing.resume.title | Pick up where you stopped. | landing |
| landing.resume.body | Marigold remembers your position in every episode and album. Start on your phone and keep going on your laptop. | landing |
| landing.oneLibrary.value | Songs and episodes | landing |
| landing.oneLibrary.label | together in your library | landing |
| landing.savedPosition.value | Your saved place | landing |
| landing.savedPosition.label | resume on your next device | landing |
| landing.offlinePlayback.value | Downloaded recordings | landing |
| landing.offlinePlayback.label | play without a connection | landing |
| landing.ruthQuote.text | I stopped keeping a note of which episode I was on. Marigold already knows. | landing |
| landing.ruthQuote.who | Ruth Adeyemi, host of The Long Way Round | landing |
| landing.harborlineRecords.alt | Harborline Records | landing |
| landing.pineconeAudio.alt | Pinecone Audio | landing |
| landing.tidepoolMedia.alt | Tidepool Media | landing |
| landing.brightwaterFm.alt | Brightwater FM | landing |
| landing.sablePodcasts.alt | Sable Podcasts | landing |
| landing.northlightMusic.alt | Northlight Music | landing |
| pushDownloadComplete.title | Ready for offline listening | pushDownloadComplete |
| pushDownloadComplete.body | {title} has finished downloading. Open Downloads to play it without a connection. | pushDownloadComplete |
| pushDownloadComplete.action | Open in Marigold | pushDownloadComplete |
| episodeComments.title | Episode comments | episodeComments |
| episodeComments.documentTitle | Episode comments · Marigold | episodeComments |
| episodeComments.composer.placeholder | Reply about this episode | episodeComments · Ready; episodeComments · Empty; episodeComments · Long content; episodeComments · Comment sent |
| episodeComments.send | Send | episodeComments · Ready; episodeComments · Empty; episodeComments · Long content; episodeComments · Sending comment; episodeComments · Comment sent; episodeComments · Comment not sent |
| episodeComments.aria.send | Send message | episodeComments · Ready; episodeComments · Empty; episodeComments · Long content; episodeComments · Sending comment; episodeComments · Comment sent; episodeComments · Comment not sent |
| episodeComments.empty.title | No questions about this episode yet. | episodeComments · Empty |
| episodeComments.empty.body | Ask the host a question; the answer stays with these episode notes. | episodeComments · Empty |
| episodeComments.empty.action | Ask about this episode | episodeComments · Empty |
| episodeComments.recovery.title | Episode comments could not be loaded. | episodeComments · Failed |
| episodeComments.recovery.action | Load comments again | episodeComments · Failed |
| home.duration | {durationSeconds} s | home · Ready; home · Loading; home · Long content |
| home.progress | Resume at {positionSeconds} s | home · Ready; home · Loading; home · Long content |
| library.duration | {durationSeconds} s | library · Ready; library · Loading; library · Long content; library · New playlist listed |
| library.lastPlayed | Played {lastPlayedAt} | library · Ready; library · Loading; library · Long content; library · New playlist listed |
| player.position | {positionSeconds} s of {durationSeconds} s | player |
| player.duration | Length: {durationSeconds} s | player |
| player.buffering | Waiting for audio… | player · Buffering |
| player.offline.available | Playing a downloaded recording without a connection. | player · Playing offline |
| player.recovery | Playback could not start. Your listening position has not changed. | player · Playback failed |
| player.retry | Retry playback | player · Playback failed |
| player.finished | You reached the end of this recording. | player · Recording finished |
| downloads.duration | {durationSeconds} s | downloads · Downloads ready; downloads · Remove selected downloads; downloads · Downloading recording; downloads · Download complete; downloads · Download failed; downloads · Removing downloads; downloads · Downloads removed; downloads · Removal failed; downloads · Long download title |
| downloads.status.transfer | Downloading the recording… | downloads · Downloading recording |
| downloads.transfer.recovery | The download did not finish. This recording is not available offline yet. | downloads · Download failed |
| downloads.transfer.retry | Retry this download | downloads · Download failed |
| downloads.status.removing | Removing the selected downloads… | downloads · Removing downloads |
| downloads.remove.recovery | The downloads were not removed. They are still available on this device. | downloads · Removal failed |
| downloads.remove.retry | Retry removal | downloads · Removal failed |
| downloads.remove.outcome | The selected downloads were removed. Your library and listening positions are kept. | downloads · Downloads removed |
| queue.duration | {durationSeconds} s | queue · Ready; queue · Loading; queue · Long content; queue · Saving queue; queue · Queue saved; queue · Queue change failed |
| queue.status | Saving the queue order… | queue · Saving queue |
| queue.outcome | The player will use this queue order. | queue · Queue saved |
| queue.recovery | The queue change was not saved. Playback still uses the previous order. | queue · Queue change failed |
| queue.retry | Retry queue change | queue · Queue change failed |
| newPlaylist.outcome | Your playlist was created. Chosen downloads will finish separately. | newPlaylist · Saved |
| newPlaylist.openLibrary | Open Library | newPlaylist · Saved |
| episodeComments.timestamp | Sent {sentAt} | episodeComments · Ready; episodeComments · Loading; episodeComments · Long content; episodeComments · Sending comment; episodeComments · Comment sent; episodeComments · Comment not sent |
| episodeComments.status | Sending your comment… | episodeComments · Sending comment |
| episodeComments.sendFailure | Your comment was not sent. Your draft is still here. | episodeComments · Comment not sent |
| episodeComments.retry | Retry this comment | episodeComments · Comment not sent |
| episodeComments.outcome | Your comment is under the episode. | episodeComments · Comment sent |
| library.playlistCount | {trackCount} tracks | library · Ready; library · Loading; library · Long content; library · New playlist listed |

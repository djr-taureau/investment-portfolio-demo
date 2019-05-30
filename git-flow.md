# Git Flow Process

* Create local branch from `origin/develop`
* For features, Name the local branch `feature/{jiraTicketNumber}-short-little-desc`
    * Example: `feature/ACD-529-revervation-units`
* For bugs, Name the local branch `bugfix/{jiraTicketNumber}-short-little-desc`
    * Example: `feature/ACD-101-incorrect-auth-header-token`
* Lots of little commits -- a good rule of thumb is to commit early and often to ensure there's never any data loss.
* Pull from `origin/develop` frequently and merge down into your local branch so you're always working off the latest.
    * **NOTE**: Always take the higher version numbers in the merge conflicts (in package.json, package-lock.json and version.ts).
* When your feature/bugfix is complete and ready for review, publish the branch and create a PR on BitBucket (BB).
* Use proper PR hygiene and provide a succinct overview description and bullet special details that might be important to the reviewer; the 
key is to provide solid context for the reviewer to not only check the code, but to understand the developer's overall goal for the work.
* Respond to and/or fix any review comments by the approver. 
* Once your PR has been approved, merge it into `develop` and always set the flag to close the branch and squash commits.
* Make final, squashed merge commit message clean like:


```
ACD-123: Feature XYZ
• List of special
• Details that might be important 
• To call out
```

## Misc

* Every time you commit a pre-commit hook will run and formats and lints the code and updates the semantic visioning of package.json and 
creates a consume-able version.js file so the app can use it. This obviously creates tons of merge conflicts as it changes every time you 
commit, but they take < 1 minute to remedy as it's just version numbers and you always take the higher one.
* If you create a PR and it's not ready for review, prefix the description with "WIP"; eg `WIP: ACD-123: Feature XYZ`.
* We do have BitBucket plugged into Slack, but the channel can get noisy, so ping the `ordering-dev` Slack channel when a PR is 
ready for review with a link to the PR.


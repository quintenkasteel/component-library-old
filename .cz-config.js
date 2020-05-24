module.exports = {
  types: [
    { value: 'feat', name: 'feat:     A new feature' },
    { value: 'bug', name: 'bug: A bug fix' },
    { value: 'hotfix', name: 'fix:   A hotfix' },
    { value: 'docs', name: 'docs:Documentation only changes' },
  ],
  messages: {
    type: "Select the type of change that you're committing:",
    scope: 'Denote the SCOPE of this change (optional):',
    // used if allowCustomScopes is true
    customScope: 'Task id from Redmine. If not in RM, use Gitlab issue id.:',
    subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
    body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    footer: 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
    confirmCommit: 'Are you sure you want to proceed with the commit above?',
  },
  allowCustomScopes: true,
};

workflow "New workflow" {
  on = "push"
  resolves = ["publish"]
}

action "Filters for GitHub Actions" {
  uses = "actions/bin/filter@e96fd9a"
  args = "branch master"
}

action "publish" {
  uses = "./.github/actions/publish"
  needs = ["Filters for GitHub Actions"]
  secrets = ["GITHUB_TOKEN"]
}

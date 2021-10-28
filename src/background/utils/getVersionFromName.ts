import semver from 'semver'

// Parse version name to get the version number witnet-1.2.1 => 1.2.1
export default function getVersionFromName(name) {
  return semver.valid(semver.coerce(name))
}
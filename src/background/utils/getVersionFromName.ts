import semver from 'semver'

// Parse version name to get the version number witnet-1.2.1 => 1.2.1
export function getVersionFromName(name: string): string | null {
  return semver.valid(semver.coerce(name))
}

export default getVersionFromName

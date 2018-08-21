export type PathNameProp = {
  pathName: string
}

export type TopBarProps = {
  className?: string
  linksProps: Array<TopBarLinkProps>
}

export type TopBarLinkProps = {
  key: string
  caption: string
  path: string
}
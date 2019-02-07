export interface PathNameProp {
  pathName: string,
}

export interface TopBarProps {
  className?: string,
  linksProps: Array<TopBarLinkProps>,
}

export interface TopBarLinkProps {
  key: string,
  caption: string,
  path: string,
}

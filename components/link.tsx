import NextLink, { LinkProps as NextLinkProps } from 'next/link'

const Link = ({ external, ...props }: LinkProps) => {
  return external ? (
    <a
      target="_blank"
      rel="noopener noreferrer"
      {...(props as AnchorProps)}
    ></a>
  ) : (
    <NextLink {...(props as NextLinkProps)}></NextLink>
  )
}

type AnchorProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>

declare global {
  type LinkProps =
    | ({ external: true } & AnchorProps)
    | ({ external?: false } & NextLinkProps)
}

export default Link
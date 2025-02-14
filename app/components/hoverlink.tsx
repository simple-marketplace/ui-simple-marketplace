export default function HoverLink(props) {
  let { className, link, name } = props;

  return (
    <a className={className} href={link} rel="noreferrer">
      {name}
    </a>
  );
}

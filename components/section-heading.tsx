type SectionHeadingProps = {
  number: string;
  kicker: string;
  title: string;
  description?: string;
  light?: boolean;
};

export function SectionHeading({ number, kicker, title, description, light = false }: SectionHeadingProps) {
  return (
    <header className={`section-heading${light ? " section-heading-light" : ""}`}>
      <p className="section-index">{number}</p>
      <div>
        <p className="section-kicker">{kicker}</p>
        <h2>{title}</h2>
      </div>
      {description ? <p className="section-description">{description}</p> : null}
    </header>
  );
}

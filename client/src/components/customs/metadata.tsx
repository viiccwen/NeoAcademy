import { Helmet } from "react-helmet";

interface MetadataProps {
  title?: string;
  description?: string;
}

export const Metadata = (props: MetadataProps) => {
  return (
    <Helmet>
      <title>{`${props.title} - NeoAcademy AI 新智學習平台`}</title>
      <meta name="description" content={props.description || "Personalized Learning, Powered by AI"} />
    </Helmet>
  );
};

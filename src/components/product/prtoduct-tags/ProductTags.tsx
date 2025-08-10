import { Product } from "@/interfaces";
interface Props {
  product: Product;
}

export const ProductTags = ({ product }: Props) => {
  const tags = product.tags;
  if (tags.length < 1) return null;

  return (
    <div className="text-sm border-t-1 border-dashed border-t-gray-300 pt-3 mt-3">
      Etiquetas:{" "}
      {tags.map((tag, index) => (
        <span key={tag.id}>
          {tag.name}
          {index < tags.length - 1 && ", "}
        </span>
      ))}
    </div>
  );
};

import type { Product } from "@/lib/catalog";

// Original SVG illustrations for this portfolio. No third-party product photos.
export default function ProductArt({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 400 320"
      role="img"
      aria-label={`${product.name} in ${product.colorName}, fictional product illustration`}
      className={className}
    >
      <ellipse cx="205" cy="265" rx="109" ry="13" fill="#172a3510" />
      {product.category === "controllers" ? (
        <g transform="rotate(-12 200 165)">
          <path
            d="M116 91 Q94 91 86 126 L59 222 Q55 254 85 249 L134 213 L265 213 L313 249 Q344 254 340 224 L313 126 Q303 91 282 91Z"
            fill={product.color}
          />
          <path
            d="M116 92H282Q303 92 313 126L319 148Q267 131 200 135Q131 131 80 148L86 126Q94 92 116 92"
            fill="#ffffff1c"
          />
          <rect
            x="147"
            y="106"
            width="105"
            height="52"
            rx="13"
            fill="#172a35"
          />
          <rect
            x="154"
            y="113"
            width="91"
            height="37"
            rx="8"
            fill="#ffffff0f"
          />
          <circle cx="142" cy="185" r="28" fill="#172a35" />
          <circle cx="142" cy="185" r="18" fill="#334752" />
          <circle cx="258" cy="185" r="28" fill="#172a35" />
          <circle cx="258" cy="185" r="18" fill="#334752" />
          <path
            d="M103 131v28M89 145h28"
            stroke="#172a35"
            strokeWidth="10"
            strokeLinecap="round"
          />
          {[
            [287, 130],
            [304, 146],
            [271, 146],
            [287, 162],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="6" fill="#f9f3e8" />
          ))}
          <circle cx="200" cy="184" r="5" fill="#f9f3e8" />
        </g>
      ) : product.category === "audio" ? (
        <g transform="rotate(10 200 170)">
          <path
            d="M112 182V128a88 88 0 0 1 176 0v54"
            fill="none"
            stroke="#203641"
            strokeWidth="25"
          />
          <path
            d="M112 163V129a88 88 0 0 1 176 0v34"
            fill="none"
            stroke={product.color}
            strokeWidth="15"
          />
          <rect
            x="85"
            y="152"
            width="61"
            height="101"
            rx="29"
            fill={product.color}
          />
          <rect
            x="254"
            y="152"
            width="61"
            height="101"
            rx="29"
            fill={product.color}
          />
          <rect x="128" y="161" width="22" height="83" rx="11" fill="#203641" />
          <rect x="250" y="161" width="22" height="83" rx="11" fill="#203641" />
          <path
            d="M281 246q-5 30-55 24"
            fill="none"
            stroke="#203641"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </g>
      ) : product.id === "desk-dock" ? (
        <g transform="rotate(-10 200 170)">
          <path d="M123 130h156l23 108H100Z" fill={product.color} />
          <path d="M111 218h179v24H111Z" fill="#172a35" />
          <rect
            x="122"
            y="65"
            width="156"
            height="125"
            rx="16"
            fill="#203641"
          />
          <rect x="135" y="78" width="130" height="90" rx="7" fill="#edf3ed" />
          <path
            d="M151 139l27-23 25 13 32-29"
            fill="none"
            stroke={product.color}
            strokeWidth="7"
            strokeLinecap="round"
          />
        </g>
      ) : (
        <g transform="rotate(-15 200 170)">
          <rect x="74" y="94" width="255" height="154" rx="52" fill="#172a35" />
          <rect
            x="74"
            y="80"
            width="255"
            height="151"
            rx="52"
            fill={product.color}
          />
          <path
            d="M87 180q115 55 229 0"
            fill="none"
            stroke="#172a3540"
            strokeWidth="3"
          />
          <rect
            x="167"
            y="133"
            width="69"
            height="33"
            rx="16"
            fill="#ffffff50"
          />
          <path
            d="M305 206l13 22"
            stroke="#172a35"
            strokeWidth="7"
            strokeLinecap="round"
          />
        </g>
      )}
    </svg>
  );
}

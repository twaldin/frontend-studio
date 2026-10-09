---
id: storefront
scale: surface
studio: commerceLayout
slots: {"required":["header","primary","state"],"optional":["detail","toolbar","actions","categories","featured","cart"]}
variants: [{"id":"grid","label":"Grid"},{"id":"list","label":"List"},{"id":"shelves","label":"Shelves"},{"id":"split","label":"List and detail"}]
states: ["loading","populated","empty","noMatches","denied","failed","detailLoading","detailUnavailable","soldOut","partial","pending","confirmed","changedTerms","paginationFailed"]
copy: ["title","priceUnit","availability"]
events: ["select","act","filter","paginate","return"]
renderer: variants
---

# Storefront

`id: storefront` · `scale: surface` · `studio: commerceLayout` · `references checked: 2026-10-08`

## Problem and outcome

A person choosing something to buy needs to browse, compare, inspect and understand availability and price before committing. The storefront exposes the relevant differences and a real purchase path without confusing viewing an item with buying it.

## When to use / When not to use

Use for products/listings with actionable availability and commercial terms. A noncommercial collection can use browse-inspect-act without adding a buy box. Plan selection belongs to [pricing](pricing.md), and payment to [checkout](checkout.md). Do not manufacture urgency, ratings or discounts to make sample content feel realistic.

## Structure and slots

Required: `header` names the catalog/scope; `primary` contains products with identity, relevant comparison data, price and availability; `state` explains loading/empty/error. Optional: `detail` provides purchase information in the same surface, `toolbar` search/filter/sort, category navigation, featured item, cart summary and purchase action. Inspection may instead be a separate stage/surface: grid/list variants do not require an unused local detail panel. The split variant needs its local `detail` placement. Bind browse-inspect-act → storefront → `toolbar` to search-filter; a local `detail` or a separate detail surface to object inspection; the checkout flow owns payment. The browse flow and storefront share their composition decision, while payment is a separate binding.

## Variants

Exactly the four `commerceLayout` labels:

- **Grid:** image-led tiles with prices. Strong for visual choice; less efficient for comparing detailed specifications. Choose when imagery is genuinely decision-relevant.
- **List:** thumbnail/detail/price rows. Strong for side-by-side attribute scanning; uses more space per image and needs consistent comparison fields.
- **Shelves:** one featured item followed by category groups. Supports curated discovery; hides global ranking and risks repetitive sideways scrolling. Each shelf needs a reachable full-category route or complete list.
- **List and detail:** selection drives a persistent detail/buy panel. Preserves browsing context and repeated inspection; consumes width and requires stable selection plus a clear phone detail route. It is the surface, not the entire browse-inspect-act flow.

## States and transitions

Load → populated, catalog empty, no matches, denied or failed. Search/filter updates scope with recoverable query state. Select opens the product without clearing filters. Product detail may load, be unavailable, sold out or partially known. Add/buy enters pending, then confirmed cart/checkout result or failure; do not update the cart count as final before confirmation. Price/availability changes during selection are disclosed before commitment. Pagination failure preserves existing products. Returning from detail/checkout restores the source selection and scroll position.

## Data and copy contract

Stable product ID/title/URL, lawful image and alt text, currency, price basis, availability, comparison attributes and permitted actions. Categories/featured choices need explicit IDs/order. Optional ratings include source and sample size; sale claims need a valid basis. Support no products, one product, long names, absent images and large localized prices. Copy keys cover catalog, price unit/tax/shipping qualification, availability, inspect, add/buy, pending, changed terms, no matches and recovery. Never imply that a catalog estimate is the final payable total.

## Accessibility

Use product lists/articles and meaningful image alternatives; avoid nested links/buttons in an all-clickable card. Accessible purchase names include the item where context is ambiguous. Sort/filter uses labeled controls; selected detail is a named region. Announce result count and confirmed cart change once, preserve focus while loading, and return from detail to the source link. State is not color-only. Maintain 44px intended touch targets, focus, contrast and zoom access to price/action terms.

## Responsive

Grid reduces columns; list metadata stacks; shelves offer visible navigation and do not hide all nonfeatured products offscreen. List and detail becomes a product view with explicit return and preserved scope. Buy actions remain reachable without covering price qualifications or virtual-keyboard content.

## Motion

Use bounded selection/content swap, not autoplay carousels or motion that steers purchasing. Cart response indicates confirmed outcome. Still/reduced-motion uses complete detail and static cart/status feedback; purchasing never waits for an animation.

## Looks

Quiet favors comparison clarity; editorial foregrounds product narrative; playful accents categories; brutalist gives prices/direct actions prominence; print resembles a legible catalog; immersive foregrounds licensed media but keeps terms on solid surfaces. All preserve identical commerce facts and actions.

## References

- [GOV.UK patterns](https://design-system.service.gov.uk/patterns/) — checked 2026-10-08, documentation read: task-oriented composition, not retail-conversion evidence.
- [Carbon empty states](https://www.carbondesignsystem.com/building-blocks/core/patterns/empty-states) — checked 2026-10-08, guidance read: contextual no-data/no-results/recovery distinctions; no storefront exercise.
- [PaceUI](https://paceui.com/) and [dev.cards](https://dev.cards/) — checked 2026-10-06 in earlier public-document research: link-only section breadth; these variants and generic data requirements are independently authored, not copied shops/assets.

## Code you can use

[Carbon core](https://github.com/carbon-design-system/carbon), candidate controls under [Apache-2.0](https://github.com/carbon-design-system/carbon/blob/main/LICENSE), read 2026-10-08. Keep license, attribution, applicable NOTICE and modified-file notices; audit a pinned source/dependency/asset set. This does not clear a complete shop, payment SDK or product media. PaceUI's per-item uncertainty and dev.cards' MIT-plus-Commons-Clause restriction keep them link-only here. No code imported and no shopping interactions verified by this author.

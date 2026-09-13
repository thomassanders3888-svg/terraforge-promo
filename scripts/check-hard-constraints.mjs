#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const lower = html.toLowerCase();
const failures = [];

function mustInclude(label, snippet) {
  if (!html.includes(snippet)) failures.push("missing: " + label);
}

function mustNotMatch(label, pattern) {
  if (pattern.test(html) || pattern.test(lower)) failures.push("forbidden: " + label);
}

mustInclude("canonical", 'rel="canonical" href="https://terraforge-us.com/"');
mustInclude("price display", "$19.99");
mustInclude("early access window", "Early access early 2027");
mustInclude(
  "PayPal client-id + SDK flags",
  "https://www.paypal.com/sdk/js?client-id=AaxLRJKmKRPyCpXy0WDxCvxbg4rELMydKeT2UvrZta2l-NEbe1NWzqBaeY2LFWn6nStNbjFmIqJ4qFQK&currency=USD&intent=capture"
);
mustInclude("createOrder description", 'description: "TerraForge early access pre-order"');
mustInclude("createOrder amount", 'value: "19.99"');
mustInclude("USD currency code", 'currency_code: "USD"');
mustInclude("voxel fantasy", "voxel");
mustInclude("ground-shaping", "ground-shaping");
mustInclude("swappable showcase", 'id="showcase-list"');
mustInclude(
  "handoff 1",
  "Shape the ground — dig and place blocks in a living voxel sandbox built for player-made terrain."
);
mustInclude(
  "handoff 2",
  "Drop in and play — boot from a clear menu straight into a world you can walk, carve, and rebuild."
);
mustInclude(
  "handoff 3",
  "Made for Windows first — early builds aim at a smooth desktop play loop while the world grows."
);
mustInclude(
  "handoff 4",
  "Sandbox roots, bigger horizon — starting with the core reshape-the-world fantasy; multiplayer and deeper systems planned as the project matures."
);
mustInclude(
  "handoff 5",
  "Early access, early 2027 — back the preorder now and help steer TerraForge as it takes shape."
);
mustInclude(
  "handoff 6",
  "Indie-built, player-first — focused on a honest dig/place sandbox, not vaporware feature lists."
);
mustInclude("reservation section", 'id="reservation"');
mustInclude("digital reservation", "digital reservation");
mustInclude("nothing to download today", "nothing to download today");
mustInclude("Helion Compact cross-link", 'href="https://helioncompact.com/"');
mustInclude("LOW WATER mention", "LOW WATER");
mustInclude("og:url", 'property="og:url" content="https://terraforge-us.com/"');
mustInclude("who section", 'id="who-heading"');
mustInclude("who copy", "not a finished MMO, not a Steam storefront today, not a crowded lobby on day one.");
mustInclude("ea section", "What early access means");
mustInclude("ea window", "EA entry when the planned <strong>early 2027</strong> window opens.");
mustInclude("loop section", "Dig, place, test");
mustInclude("loop copy", "That is the loop — not a masquerade of a live MMO.");
mustInclude("faq section", "Early access FAQ");
mustInclude("faq window", "Targeting <strong>early 2027</strong> for a Windows-first early-access window");
mustInclude("preorder anchor", 'id="preorder"');

mustNotMatch("Steam store URL", /store\.steampowered\.com/i);
mustNotMatch("Steam availability claim", /available on steam|buy (?:it )?on steam|get (?:it )?on steam|wishlist on steam/i);
mustNotMatch("Unity marketing", /unity binary|unity binaries|powered by unity|made (?:with|in) unity|\.apk|\.exe|code dump/i);
mustNotMatch("Otcn", /otcn/i);
mustNotMatch("hosted PayPal tip N3J6", /n3j6/i);
mustNotMatch("hosted PayPal tip BAAGUL", /baagul/i);
mustNotMatch("hosted buttons markup", /paypal\.com\/ncp\/payment|hostedbutton/i);
mustNotMatch("ad network", /googletagmanager|doubleclick|adservice|carbonads/i);

const h1 = (html.match(/<h1[^>]*>[\s\S]*?<\/h1>/i) || [])[0] || "";
if (!/TerraForge/.test(h1)) failures.push("missing: h1 TerraForge");

if (failures.length) {
  console.error("Landing hard-constraint check failed:\n- " + failures.join("\n- "));
  process.exit(1);
}

console.log("Landing hard-constraint check passed.");

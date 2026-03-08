module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/async_hooks [external] (async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("async_hooks", () => require("async_hooks"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/sanity/schemaTypes/einstellungen.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@sanity/types/lib/index.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineType"])({
    name: "einstellungen",
    title: "Einstellungen",
    type: "document",
    fields: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineField"])({
            name: "firmenname",
            title: "Firmenname",
            type: "string"
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineField"])({
            name: "tagline",
            title: "Tagline (Hero Untertitel)",
            type: "string"
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineField"])({
            name: "telefon",
            title: "Telefon",
            type: "string"
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineField"])({
            name: "email",
            title: "E-Mail",
            type: "string"
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineField"])({
            name: "adresse",
            title: "Adresse",
            type: "string"
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineField"])({
            name: "oeffnungszeiten",
            title: "Öffnungszeiten",
            type: "string"
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineField"])({
            name: "heroTitel",
            title: "Hero Titel",
            type: "string"
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineField"])({
            name: "heroBeschreibung",
            title: "Hero Beschreibung",
            type: "text",
            rows: 3
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineField"])({
            name: "uebermichTitel",
            title: "Über uns Titel",
            type: "string"
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineField"])({
            name: "uebermichText",
            title: "Über uns Text",
            type: "text",
            rows: 5
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineField"])({
            name: "seoTitel",
            title: "SEO Titel",
            type: "string"
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineField"])({
            name: "seoBeschreibung",
            title: "SEO Beschreibung",
            type: "text",
            rows: 2
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineField"])({
            name: "jahreErfahrung",
            title: "Jahre Erfahrung (Zahl)",
            type: "number"
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineField"])({
            name: "anzahlProjekte",
            title: "Anzahl Projekte (Zahl)",
            type: "number"
        })
    ]
});
}),
"[project]/sanity/schemaTypes/leistung.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@sanity/types/lib/index.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineType"])({
    name: "leistung",
    title: "Leistungen",
    type: "document",
    fields: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineField"])({
            name: "titel",
            title: "Titel",
            type: "string"
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineField"])({
            name: "slug",
            title: "URL Slug",
            type: "slug",
            options: {
                source: "titel"
            }
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineField"])({
            name: "kurzBeschreibung",
            title: "Kurzbeschreibung",
            type: "text",
            rows: 2
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineField"])({
            name: "beschreibung",
            title: "Vollständige Beschreibung",
            type: "text",
            rows: 6
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineField"])({
            name: "bild",
            title: "Bild",
            type: "image",
            options: {
                hotspot: true
            }
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineField"])({
            name: "reihenfolge",
            title: "Reihenfolge",
            type: "number"
        })
    ],
    orderings: [
        {
            title: "Reihenfolge",
            name: "reihenfolgeAsc",
            by: [
                {
                    field: "reihenfolge",
                    direction: "asc"
                }
            ]
        }
    ]
});
}),
"[project]/sanity/schemaTypes/partner.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@sanity/types/lib/index.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineType"])({
    name: "partner",
    title: "Partner",
    type: "document",
    fields: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineField"])({
            name: "name",
            title: "Name",
            type: "string"
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineField"])({
            name: "beschreibung",
            title: "Beschreibung",
            type: "string"
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineField"])({
            name: "logo",
            title: "Logo",
            type: "image",
            options: {
                hotspot: true
            }
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineField"])({
            name: "webseite",
            title: "Webseite URL",
            type: "url"
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineField"])({
            name: "reihenfolge",
            title: "Reihenfolge",
            type: "number"
        })
    ],
    orderings: [
        {
            title: "Reihenfolge",
            name: "reihenfolgeAsc",
            by: [
                {
                    field: "reihenfolge",
                    direction: "asc"
                }
            ]
        }
    ]
});
}),
"[project]/sanity/schemaTypes/zertifikat.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@sanity/types/lib/index.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineType"])({
    name: "zertifikat",
    title: "Zertifikate",
    type: "document",
    fields: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineField"])({
            name: "name",
            title: "Name",
            type: "string"
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineField"])({
            name: "beschreibung",
            title: "Beschreibung",
            type: "string"
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineField"])({
            name: "bild",
            title: "Bild",
            type: "image",
            options: {
                hotspot: true
            }
        }),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$types$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["defineField"])({
            name: "reihenfolge",
            title: "Reihenfolge",
            type: "number"
        })
    ],
    orderings: [
        {
            title: "Reihenfolge",
            name: "reihenfolgeAsc",
            by: [
                {
                    field: "reihenfolge",
                    direction: "asc"
                }
            ]
        }
    ]
});
}),
"[project]/sanity/schemaTypes/index.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "schemaTypes",
    ()=>schemaTypes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$schemaTypes$2f$einstellungen$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sanity/schemaTypes/einstellungen.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$schemaTypes$2f$leistung$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sanity/schemaTypes/leistung.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$schemaTypes$2f$partner$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sanity/schemaTypes/partner.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$schemaTypes$2f$zertifikat$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sanity/schemaTypes/zertifikat.ts [app-rsc] (ecmascript)");
;
;
;
;
const schemaTypes = [
    __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$schemaTypes$2f$einstellungen$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$schemaTypes$2f$leistung$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$schemaTypes$2f$partner$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$schemaTypes$2f$zertifikat$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
];
}),
"[project]/sanity.config.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sanity$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/sanity/lib/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sanity$2f$lib$2f$_chunks$2d$es$2f$pane$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sanity/lib/_chunks-es/pane.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$vision$2f$lib$2f$_chunks$2d$es$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@sanity/vision/lib/_chunks-es/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$schemaTypes$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sanity/schemaTypes/index.ts [app-rsc] (ecmascript)");
;
;
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sanity$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["defineConfig"])({
    name: "sq-schmidt",
    title: "SQ Schmidt Admin",
    projectId: "cbnefaat",
    dataset: "production",
    plugins: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sanity$2f$lib$2f$_chunks$2d$es$2f$pane$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["structureTool"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$sanity$2f$vision$2f$lib$2f$_chunks$2d$es$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["visionTool"])()
    ],
    schema: {
        types: __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2f$schemaTypes$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["schemaTypes"]
    }
});
}),
"[project]/app/studio/[[...tool]]/page.tsx [app-rsc] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StudioPage,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$sanity$2f$dist$2f$studio$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next-sanity/dist/studio/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2e$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sanity.config.ts [app-rsc] (ecmascript)");
;
;
;
const dynamic = 'force-static';
;
function StudioPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$sanity$2f$dist$2f$studio$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["NextStudio"], {
        config: __TURBOPACK__imported__module__$5b$project$5d2f$sanity$2e$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"]
    }, void 0, false, {
        fileName: "[project]/app/studio/[[...tool]]/page.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
}),
"[project]/app/studio/[[...tool]]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$studio$2f5b5b2e2e2e$tool$5d5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"],
    "dynamic",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$studio$2f5b5b2e2e2e$tool$5d5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["dynamic"],
    "metadata",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$sanity$2f$dist$2f$studio$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["metadata"],
    "viewport",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$sanity$2f$dist$2f$studio$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["viewport"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$studio$2f5b5b2e2e2e$tool$5d5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/app/studio/[[...tool]]/page.tsx [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$sanity$2f$dist$2f$studio$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next-sanity/dist/studio/index.js [app-rsc] (ecmascript) <locals>");
}),
"[project]/app/studio/[[...tool]]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/studio/[[...tool]]/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__731367b3._.js.map
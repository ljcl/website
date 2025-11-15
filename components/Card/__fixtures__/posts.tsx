import { ExternalLinkIcon } from "../PinCard/ExternalLinkIcon";

export const posts = [
  {
    title: "Why you should be using HTTP/2 and HTTPS",
    href: "posts/why-you-should-be-using-http-2-and-https",
    description:
      "You should be using h2 (HTTP/2) and HTTPS and compelling reasons to make the switch to HTTPS if for you still haven’t.",
    icon: null,
    iconText: undefined,
  },
  {
    title: "A Single Div",
    href: "http://a.singlediv.com/",
    description: "A Single Div: a CSS drawing project by Lynn Fisher",
    icon: ExternalLinkIcon,
    iconText: "External Link",
  },
  {
    title: "A Few Points on 'SEO'",
    href: "posts/a-few-points-on-seo",
    description:
      "Some observational points on why you should work on investing in quality content, a good platform, and classic marketing",
    icon: null,
    iconText: undefined,
  },
  {
    title: "Some JavaScript Sketches • Matt DesLauriers",
    href: "http://mattdesl.svbtle.com/some-javascript-sketches",
    description:
      "October 13, 2015 Some JavaScript Sketches It&#x2019;s been a while since a blog post, so here&#x2019;s a look at some small sketches I&#x2019;ve developed in the last six months. Most of them use&hellip;",
    icon: ExternalLinkIcon,
    iconText: "External Link",
  },
] as const;

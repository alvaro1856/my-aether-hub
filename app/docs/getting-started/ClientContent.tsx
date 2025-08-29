// app/docs/getting-started/ClientContent.tsx
"use client";
import Content from "./content.mdx";
import Callout from "../../_components/Callout";
import { Steps, Step } from "../../_components/Steps";

export default function ClientContent() {
  return <Content components={{ Callout, Steps, Step }} />;
}

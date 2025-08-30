"use client";
import Content from "./content.mdx";
import Callout from "../../_components/Callout";
import { Steps, Step } from "../../_components/Steps";
import Pre from "../../_components/Code"; // renamed for clarity

export default function ClientContent() {
  return <Content components={{ Callout, Steps, Step, pre: Pre }} />;
}

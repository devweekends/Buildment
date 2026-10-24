import type { SequenceSpec } from "../renderers/sequence/types";

// Course: data-engineering (course 15), chapter 6.2 "ETL, ELT and data zones".
// One Mizan price report travels from the phone form to the restricted zone,
// then to the shared zone without the name and the phone number, then into the
// warehouse, where the transformation happens after loading. See spec.md.
export const eltZonesFlow: SequenceSpec = {
  kind: "sequence",
  title: "One price report, from the phone to the warehouse",
  purpose: "Follow one price report through the zones and see where the volunteer's name and phone number stop and where the transformation happens.",
  summary:
    "A phone form uploads a price report with the volunteer's name and phone number. The restricted zone keeps it as it arrived and lands it as Parquet. A publish step drops the name and replaces the phone number with a keyed code, so the shared zone holds no name or phone. The warehouse loads the shared files unchanged and transforms them afterwards, which is ELT.",
  actors: [
    { name: "Phone form", sub: "volunteer V05" },
    { name: "Restricted zone", sub: "names and phones" },
    { name: "Shared zone", sub: "keys only" },
    { name: "Warehouse", sub: "SQL tables" },
  ],
  steps: [
    {
      from: 0,
      to: 1,
      label: "upload JSON",
      title: "The phone sends a batch",
      note: "When the connection returns, the form uploads a batch of price reports. Each line carries the price, the market and item codes, and also the volunteer's name and phone number, exactly as the form made it.",
      chips: ["report_id", "price", "volunteer_name", "volunteer_phone"],
    },
    {
      from: 1,
      to: 1,
      label: "land as Parquet",
      title: "Land it, change nothing",
      note: "The landing job turns the upload into one Parquet file for the day. Nothing is removed. This zone is restricted, so only a few people may read it, and the raw data stays here in case a rule changes later.",
      chips: ["one file per day", "name and phone kept"],
    },
    {
      from: 1,
      to: 2,
      label: "publish, no names",
      title: "Publish a copy without the person",
      note: "The publish step drops the name and replaces the phone number with volunteer_key, a code made from the phone number and a secret that is not stored with the data. The shared copy cannot name the volunteer without that secret.",
      chips: ["volunteer_key", "no name", "no phone"],
      tone: "good",
      outcome: "pseudonymised",
    },
    {
      from: 2,
      to: 3,
      label: "load unchanged",
      title: "The warehouse loads the files as they are",
      note: "Loading comes first and does no clean-up. The raw shape is still there if a business rule changes and the models must run again over the same files.",
      chips: ["same columns", "keys only"],
    },
    {
      from: 3,
      to: 3,
      label: "transform (dbt)",
      title: "Transform after loading",
      note: "Models clean, join and add up the data inside the warehouse. Transforming after loading is called ELT. The tables hold keys and prices, never names or phone numbers.",
      chips: ["ELT", "models in SQL"],
      tone: "good",
      outcome: "ELT",
    },
  ],
  tryThis: [
    "Before step 3, predict which columns the shared file keeps. Then check the chips: the name and the phone are gone, and volunteer_key has appeared.",
    "At step 5, find the word that says when the transformation happens. In ELT it comes after loading.",
  ],
  limits:
    "The picture follows one report. A real day has about a hundred reports in one file, and several steps run once for the whole file. It shows where the personal data stops, not how strong the code is: anyone who holds the secret and a phone number can work out the key, so the shared zone is still data about people (chapter 11.3 returns to this).",
};

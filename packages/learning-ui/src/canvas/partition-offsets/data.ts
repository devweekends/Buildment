import type { SequenceSpec } from "../renderers/sequence/types";

// Course: data-engineering (course 15), chapter 10.2 "Logs, topics, partitions and offsets".
// Battery readings for site S2 go into one partition of a log in order. A
// consumer reads three of them, writes two to a database and crashes before it
// saves its position, so it reads the same events again after it restarts. The
// claims follow the dossier: ordering is kept inside one partition, events with
// the same key go to the same partition, reading does not remove events, and
// the offset is the consumer's position. See spec.md.
export const partitionOffsets: SequenceSpec = {
  kind: "sequence",
  title: "Readings in a partition, and a crash before the save",
  purpose: "Follow three battery readings into a log and a consumer that crashes before it saves its position, and see what it reads again.",
  summary:
    "A producer appends three readings for site S2 to partition 0, at offsets 0, 1 and 2. Because they share a key, they stay in order. A consumer polls from its saved position, offset 0, and receives all three. It writes offsets 0 and 1 to the database and crashes before it saves its position. After the restart its saved position is still 0, so it reads offsets 0, 1 and 2 again and writes them again. The database now holds 5 rows for 3 readings. It then saves position 3.",
  actors: [
    { name: "Producer", sub: "sensor app" },
    { name: "Partition 0", sub: "the log" },
    { name: "Consumer", sub: "the reader" },
    { name: "Database", sub: "the sink" },
  ],
  steps: [
    {
      from: 0,
      to: 1,
      label: "S2 85%, key S2",
      title: "The first reading goes to the end of the log",
      note: "The producer sends a reading with a key, the site id S2. The log adds it at the end, at offset 0. The key decides the partition: every event with key S2 goes to this one.",
      chips: ["key: S2", "offset 0"],
    },
    {
      from: 0,
      to: 1,
      label: "S2 84%, key S2",
      title: "The second reading follows it",
      note: "The same key means the same partition, so the new reading lands after the first one, at offset 1. Order is kept inside a partition.",
      chips: ["key: S2", "offset 1"],
    },
    {
      from: 0,
      to: 1,
      label: "S2 82%, key S2",
      title: "The third reading",
      note: "Offset 2. A site S7 would have its own key and might use another partition. Nothing orders the readings of S2 against the readings of S7.",
      chips: ["key: S2", "offset 2", "other keys: other order"],
    },
    {
      from: 2,
      to: 1,
      label: "poll from 0",
      title: "The consumer asks for events from its saved position",
      note: "The consumer keeps a position in this partition: one number, the offset. Its saved position is 0, so it asks for everything from offset 0. It saves the position only after it finishes a batch.",
      chips: ["saved position: 0"],
    },
    {
      from: 1,
      to: 2,
      label: "offsets 0, 1, 2",
      title: "The log returns three events",
      note: "Reading does not remove anything. The three events stay in the log, and another consumer group could read them too. The consumer now holds offsets 0, 1 and 2.",
      chips: ["events kept in the log"],
    },
    {
      from: 2,
      to: 3,
      label: "write 0 and 1",
      title: "The consumer writes two rows",
      note: "It writes the readings at offsets 0 and 1 to the database. It has not saved its position yet, so the log still thinks the consumer is at 0.",
      chips: ["rows in database: 2", "saved position: 0"],
    },
    {
      from: 2,
      to: 2,
      label: "crash",
      tone: "bad",
      outcome: "before the save",
      title: "The consumer crashes before it saves its position",
      note: "The power goes off after two writes and before the save. The position was never saved, so the log cannot know that offsets 0 and 1 were already written.",
      chips: ["saved position: still 0"],
    },
    {
      from: 2,
      to: 1,
      label: "poll from 0 again",
      tone: "warn",
      title: "After the restart it starts from the saved position",
      note: "The restarted consumer asks for events from its saved position, which is still 0. It does not remember what it wrote before the crash.",
      chips: ["saved position: 0"],
    },
    {
      from: 1,
      to: 2,
      label: "offsets 0, 1, 2",
      tone: "warn",
      title: "The same three events come back",
      note: "The log returns offsets 0, 1 and 2 again. Offsets 0 and 1 are repeats of events that were already written.",
      chips: ["2 repeats"],
    },
    {
      from: 2,
      to: 3,
      label: "write 0, 1 and 2",
      tone: "bad",
      outcome: "5 rows, 3 readings",
      title: "The database receives the repeats",
      note: "A sink that adds a row each time now holds 5 rows for 3 readings. A sink that keeps one row per offset, or per reading id, would hold 3. That is the next chapter's subject.",
      chips: ["rows: 5", "true readings: 3"],
    },
    {
      from: 2,
      to: 1,
      label: "save position 3",
      tone: "good",
      outcome: "position 3",
      title: "Now the consumer saves its position",
      note: "A saved position of 3 means: next time, start at offset 3. If the consumer crashes after this, it does not read offsets 0 to 2 again.",
      chips: ["saved position: 3"],
    },
  ],
  tryThis: [
    "Before step 8, predict where the consumer starts after the crash. Then check: at its saved position, 0, not after the last event it wrote.",
    "Count the rows in the database at the end and the readings that exist in the log. Which step added the two extra rows?",
    "Look at the saved position in each step. At which step does it change, and what must happen before it can change safely?",
  ],
  limits:
    "This shows one partition and one consumer, and it leaves out the other partitions of the topic, consumer groups with several readers, and the copies that a real cluster keeps of each partition. The 5 rows come from a sink that adds a row every time; a different sink would give a different count. The step where the position is saved is simplified to one message.",
};

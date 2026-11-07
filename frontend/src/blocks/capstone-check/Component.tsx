import { fetchBlockState } from "@/blocks/block-state";
import { PendingBlockCard } from "@buildment/learning-ui/components/learn/pending-block-card";
import { CapstoneCheckClient } from "./CapstoneCheckClient";

/**
 * A capstone check block. The config comes from the API as a projection (title, the
 * live URL rule and the criterion titles); the rubric pack never leaves the server.
 */
export async function CapstoneCheckComponent({ id }: { id?: string }) {
  if (id) {
    const state = await fetchBlockState(id, "CAPSTONE_CHECK");
    if (state) return <CapstoneCheckClient id={id} config={state.config} initialState={state.initialState} />;
  }
  if (id) {
    return (
      <PendingBlockCard
        typeLabel="Capstone check"
        title="Capstone check"
        description="The capstone check for this chapter is being set up."
        blockId={id}
      />
    );
  }
  return null;
}

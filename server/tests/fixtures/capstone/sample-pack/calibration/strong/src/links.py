def create_link(proposal_id: str) -> dict:
    return {"id": proposal_id, "url": f"/p/{proposal_id}"}


def record_visit(store: dict, link_id: str) -> None:
    store[link_id] = store.get(link_id, 0) + 1

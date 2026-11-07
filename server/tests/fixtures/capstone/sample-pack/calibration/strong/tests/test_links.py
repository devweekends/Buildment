from src.links import create_link, record_visit


def test_creates_a_link_and_records_a_visit():
    store = {}
    record_visit(store, create_link("acme")["id"])
    assert store["acme"] == 1

from fastapi.testclient import TestClient

from app.main import create_app

client = TestClient(create_app())


def test_health_ok():
    res = client.get("/ai/health")
    assert res.status_code == 200
    body = res.json()
    assert body["status"] == "ok"
    assert "ai_enabled" in body

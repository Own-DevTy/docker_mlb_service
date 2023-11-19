import logging
from sqlalchemy import text
from db.session import SessionLocal

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def init() -> None:
    try:
        db = SessionLocal()
        db.execute(text("SELECT 1"))
    except Exception as err:
        logger.error(err)
        raise err


def main() -> None:
    logger.info("Initializing service")
    init()
    logger.info("Service finished initializing")


if __name__ == "__main__":
    main()

from typing import Optional, Tuple

def to_cursor_paging(limit: int = 20, cursor: Optional[str] = None) -> Tuple[int, Optional[str]]:
    # For supabase we can call .limit(limit) and .gt("id", cursor) where cursor is last_id
    return (limit, cursor)

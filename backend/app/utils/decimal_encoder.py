import json
from decimal import Decimal
from fastapi.encoders import jsonable_encoder

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, Decimal):
            # convert to string to preserve precision, alternatively float()
            return str(o)
        return super().default(o)

def encode(obj):
    return json.loads(json.dumps(obj, cls=DecimalEncoder))

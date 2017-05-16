#! /usr/bin/env python3
from app import get_app
app = get_app()

import db
import schemas
import resources

app.run(debug=True)

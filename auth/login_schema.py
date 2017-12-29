from app import ma

class LoginSchema(ma.Schema):

    class Meta:
        strict = True

    user = ma.String()
    password = ma.String(load_from='pass')

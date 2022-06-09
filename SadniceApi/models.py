
from sqlalchemy.sql.sqltypes import Boolean, DateTime, Float
from sqlalchemy import Column, Integer, String
from init import db
class Korisnik(db.Model):

    id = Column(Integer,primary_key=True)
    email = Column(String(50))
    korisnicko_ime = Column(String(50),unique=True)
    lozinka = Column(String(200))
    admin = Column(Integer)

    def __init__(self,email,korisnicko_ime,lozinka,admin):
        self.email = email
        self.korisnicko_ime = korisnicko_ime
        self.lozinka = lozinka
        self.admin = admin

class Sadnica(db.Model):

    id = Column(Integer,primary_key=True)
    naziv = db.Column(String(50))
    slika = Column(String(50))
    tip = Column(String(50))
    opis = Column(String(50))

    def __init__(self,naziv,slika,tip,opis):
        self.naziv = naziv
        self.slika = slika
        self.tip = tip
        self.opis = opis
class Usluga(db.Model):

    id = Column(Integer,primary_key=True)
    naziv = Column(String(50))
    slika = Column(String(50))
    opis = Column(String(50))


    def __init__(self,naziv,slika,opis):
        self.naziv = naziv
        self.slika = slika
        self.opis = opis
class Korisnik_Usluga(db.Model):
    id = Column(Integer,primary_key=True)
    cijena = Column(Float)
    usluga_id = Column(Integer)
    korisnik_id = Column(Integer)

    
    def __init__(self,cijena,usluga_id,korisnik_id):
        self.cijena = cijena
        self.korisnik_id = korisnik_id
        self.usluga_id = usluga_id
        
class Korisnik_Sadnica(db.Model):
    id = Column(Integer,primary_key=True)
    cijena = Column(Float)
    sadnica_id = Column(Integer)
    korisnik_id = Column(Integer)

    
    def __init__(self,cijena,sadnica_id,korisnik_id):
        self.cijena = cijena
        self.korisnik_id = korisnik_id
        self.sadnica_id = sadnica_id
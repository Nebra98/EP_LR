Kada cloniras repozitorij moras instalirat sve sto je u requirements txt
To ces uradit na taj nacin sto ces pokrenuti naredbu pip install -r requirements.txt
onda pokreni python skriptu u cmdu tako da samo ukucas python i pritisnes enter
onda unosi ovo
from init import db
from models import \*
db.create_all()
Tako ces napunit bazu
Prije toga moras instalirat xampp pokrenut mysql i ostale stvari preko njega napravit bazu pod imenom Sadnice
i tjt keyeve jsona mozes naci u kodu pa to sam pogledaj

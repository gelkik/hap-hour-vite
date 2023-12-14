import json
from geopy.geocoders import Nominatim

def get_lat_long(address):
    geolocator = Nominatim(user_agent="hapHour") 
    location = geolocator.geocode(address,timeout=10)

    if location:
        latitude, longitude = location.latitude, location.longitude
        return latitude, longitude
    else:
        print(f"Couldn't find coordinates for address: {address}")
        return None

# print(get_lat_long("175 5th Avenue NYC"))
with open('seedData.json', 'r') as file:
    json_data = json.load(file)

for entry in json_data:
    address = entry['address']
    coordinates = get_lat_long(address)

    if coordinates:
        entry['latitude'] = coordinates[0]
        entry['longitude'] = coordinates[1]
    else:
        entry['latitude'] = None
        entry['longitude'] = None


with open('seedData.json', 'w') as file:
    json.dump(json_data, file, indent=2)

# for item in json_data:
#     print(item)

import json
import boto3
# from decimal import Decimal
# from geopy.geocoders import Nominatim
# def get_lat_long(address):
#     geolocator = Nominatim(user_agent="hapHour") 
#     location = geolocator.geocode(address,timeout=10)

#     if location:
#         latitude, longitude = location.latitude, location.longitude
#         return latitude, longitude
#     else:
#         print(f"Couldn't find coordinates for address: {address}")
#         return None
# # print(get_lat_long("175 5th Avenue NYC"))
# class DecimalEncoder(json.JSONEncoder):
#     def default(self, obj):
#         if isinstance(obj, Decimal):
#             return str(obj)
#         return super(DecimalEncoder, self).default(obj)
    
# with open('seedData.json', 'r') as file:
#     json_data = json.load(file)
# # id = 1
# for entry in json_data:
#     # entry['latitude'] = Decimal(entry['latitude'])
#     # entry['longitude'] = Decimal(entry['longitude'])
#     address = entry['address']
#     coordinates = get_lat_long(address)

#     if coordinates:
#         entry['latitude'] = Decimal(coordinates[0])
#         entry['longitude'] = Decimal(coordinates[1])
#     else:
#         entry['latitude'] = None
#         entry['longitude'] = None
#     # print(type(entry['latitude']))
#     # del entry['latitude']
#     # del entry['longitude']
#     # entry['id'] = id
#     # id +=1

# with open('seedData.json', 'w') as file:
#     json.dump(json_data, file, indent=2, cls=DecimalEncoder)

region = 'us-east-1'
table_name = 'Restaurants'

dynamodb = boto3.resource('dynamodb', region_name=region)
table = dynamodb.Table(table_name)
seed_file = 'seedData.json'

# with open(seed_file, 'r') as file:
#     seed_data = json.load(file)

# for item in seed_data:
#     try:
#         response = table.put_item(Item=item)
#         print(f"Item added successfully: {response}")
#     except Exception as e:
#         print(f"Erro adding item: {e}")
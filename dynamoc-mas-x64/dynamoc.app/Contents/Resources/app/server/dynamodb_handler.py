import boto3


class DynamodbHandler(object):
    def __init__(self, endpoint_url, aws_access_key_id, aws_secret_access_key, region_name):
        self.dynamodb = boto3.resource('dynamodb',
                                       aws_access_key_id=aws_access_key_id,
                                       aws_secret_access_key=aws_secret_access_key,
                                       endpoint_url=endpoint_url,
                                       region_name=region_name)

    def list(self):
        table_names = []
        for table in self.dynamodb.tables.all():
            table_names.append(table.name)
        return table_names

    def scan(self, tableName, evaluatedKey):
        table = self.dynamodb.Table(tableName)
        if evaluatedKey:
            return table.scan(
                Limit=20,
                ExclusiveStartKey=evaluatedKey
            )
        else:
            return table.scan(
                Limit=20
            )

    def getRecord(self, tableName, key):
        table = self.dynamodb.Table(tableName)
        return table.get_item(
            Key=key
        )['Item']

    def getHeaders(self, tableName):
        table = self.dynamodb.Table(tableName)
        headers = {
            "hash": "",
            "range": "",
            "normal": []
        }

        for key in table.key_schema:
            if key['KeyType'] == 'HASH':
                headers['hash'] = key['AttributeName']
            elif key['KeyType'] == 'RANGE':
                headers['range'] = key['AttributeName']

        for record in table.scan(Limit=20)['Items']:
            headers['normal'] = list(set(headers['normal'] + record.keys()))
        if headers['hash'] in headers['normal']:
            headers['normal'].remove(headers['hash'])
        if headers['range']:
            headers['normal'].remove(headers['range'])

        return headers

    def getTableInfo(self, tableName):
        self.dynamodb.Table

    def delete(self, tableName, dataId):
        table = self.dynamodb.Table(tableName).delete_item(
            Key={

            }
        )

import Crypto.Cipher.AES
import hashlib

# Original AES key and password
aes_key = "owner's-super-secret-session-id"
owner_password = "IBoughtItAtCostco"


# Ensure the AES key is of the correct length by padding it
def pad_key(key):
    # Use SHA-256 and truncate to 32 bytes
    return hashlib.sha256(key.encode()).digest()[:32]


# Pad the key
padded_aes_key = pad_key(aes_key)


# Ensure the password is a multiple of 16 bytes for AES encryption
def pad_password(password):
    while len(password) % 16 != 0:
        password += ' '
    return password


# Pad the password
padded_password = pad_password(owner_password)

# Create the AES cipher with the padded key
cipher = Crypto.Cipher.AES.new(padded_aes_key, Crypto.Cipher.AES.MODE_ECB)

# Encrypt the padded password
encrypted_password = cipher.encrypt(padded_password.encode())
# Convert the encrypted byte string into a hexadecimal string
encrypted_password_hex = encrypted_password.hex()

# Print the hexadecimal string
print(encrypted_password_hex)

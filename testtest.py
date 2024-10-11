import base64

password = base64.b64encode(b"SC4013_CTF_AB{sup3r_53cur3_pa55w0rd_ye5}")
yes = base64.b64decode(password)
print(yes)


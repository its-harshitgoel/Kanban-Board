def respond_to_birthday_wishes(message):
    if "happy birthday" in message.lower():
        return "Thank you!"
    else:
        return None  # Return None if the message doesn't contain "happy birthday"
    
message = "Wishing you a hAppy birthday!"
response = respond_to_birthday_wishes(message)

print(response)  # Output: "Thank you!"

message = "Just wanted to say hello!"
response = respond_to_birthday_wishes(message)

print(response)  # Output: None
    ZeroDivisionError
    

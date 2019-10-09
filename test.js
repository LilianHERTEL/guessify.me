var roomList = new Map();
roomList.set("hi",{keyhi: 5,obj:{hi:["gay"]}})
var room = roomList.get("hi");
    if(!room)
    {
      console.log('Room not found');
      return;
    }
    room.obj.hi.push("not gay")
    console.log(roomList.get("hi"))
# Video-Synchronization-Platform

![4  Converted](https://user-images.githubusercontent.com/85503750/213990999-6b7acd3e-26a9-4e20-b857-e82af9c6d493.png)

## About Colour-PLAY
Colour-PLAY is a video synchronization platform created for viewing parties with friends!

To use Colour-PLAY just enter your name and a shared room number with friends. Then all you have to do is select your video client (YouTube by default), enter a video ID, and click "Change Video". All video playback should be synchronized to everyone in the room!

There is one host per room that can control the video client directly with the native player controls. Everyone else can still use them but it will only affect them until they hit sync!

---

## Contact Me
### Who Am I?

I'm Yasiru Tishan A Lead in Graphic Designer & Web Developer I am a creative professional with extensive graphic design, web development, social media, and project management. I am also good at multitasking and hard worker.

I am an enthusiastic, confident character and goal-oriented team leader and counts on interpersonal skills and organizational planning as a critical strength. My experience in IT is attached to the technology industry, architecture, corporate sectors, and designer positions.

You can contact me directly at 10749896@students.plymouth.ac.uk if you have any questions, concerns, or just to say hi! If you want to submit a suggestion, please see the github issues page.

---

### Dependencies

Socket.io

Node.js

MongoDB

Angular Cli

Express

YouTube Data API V3

---

### How to run locally

##### How to run the server

Install Dependencies
```
npm install
```

Create a `.env` file and add API keys for YouTube Data API V3 and Dailymotion SDK (Optional) as YT3_API_KEY and DM_API_KEY

Run the server
```
node server
```

Access the page by going to localhost:3000

##### How to run CI tests

```
npm test
```

---

### How it works

##### The Basics

The entire functionality of Vynchronize relies on web sockets, specifically
Socket.IO. When a client connects to the server, a socket is created. The user
then enters a name and a room number. The inputs are sent back to the server, and
it creates/joins a room of that name with Socket.IO. Any user can connect to the
room and interact with the users there.

Socket.IO functions can be emitted to certain rooms only. This way users in a
specific room can call a function and have it only affect their room. This
provides the foundation of the functionality.

##### Functionality

The functionality of synchronization is simply controlling the video player, and
calling the same functions for each socket in the room. For example if a person
calls play, it will call play for every connected socket. If a person calls sync
it will retrieve the current time from that user only and send the data to every
other socket. It will use that data and bring everyone to the correct time.

##### Hosts

At first it was fine to have host-less rooms, but I quickly realized
that people want to be auto-synced rather than hitting the sync button over
and over. For example if you join an already existing room, you want to jump
right into the content rather than worrying about syncing!

To do this I created a host socket which would be marked when a room is created.
This host socket is responsible for sending all the important video information
to any new sockets that join. Socket.IO rooms have a really nice variable that
can hold specific information for a room.

```
io.sockets.adapter.rooms['room-'+roomnum].host = socket.id
```

Along with holding the host information this object also holds the current
video, player, and connected clients.

##### Video Players

At first I only supported the YouTube API because it was the easiest and most
popular video platform. While it was good for what it was, I wanted to support
many more players. It was difficult at first because the way I implemented
YouTube was in a way that would not work with others. Additionally every
video player had a different API and functioned differently.

I started playing around with the Daily Motion API, and I had to completely
redesign how I was displaying the player. What I did was simply initialize all
of the players and would destroy/hide a player when necessary. While this worked
there seemed to be many bugs.

This was probably the hardest part so far. Just because of all of the
asynchronous calls messing up some of the sockets. I finally figured out a way
to add all the possible data into the host and room object. Any new sockets that
join or sync will have all the data already loaded and synced automatically.
Even when you play a YouTube video and switch players, your progress on the
original YouTube video will be saved and you can go back to it at any time.

This set up the foundation for many more video players in the future. I hope to
implement them soon! One feature I would really like would be the ability to
parse videos from any link, but that may be out of my ability at the moment!


##### The Room Object

io.sockets.adapter.rooms['room-'+roomnum]

This is the special object generated for every room created. Here is it's structure:

```
io.sockets.adapter.rooms['room-'+roomnum]
│   .host
|   .hostName
|   .users
│   .currPlayer
|   .length
│
└───.currVideo
│   |   .yt
│   |   .dm
│   |   .vimeo
│   |   .html5
|
└───.prevVideo
│   │
│   └───.yt
│   |   |   .id
│   |   |   .time
│   └───.dm
│   |   |   .id
│   |   |   .time
│   └───.vimeo
│   |   │   .id
│   |   │   .time
│   └───.html5
│       │   .id
│       │   .time
|
└───.queue
│   |
|   └───.yt
|   |   └───[{
|   |   |   videoId,
|   |   |   title
|   |   |   }]
|   |
│   └───.dm
|   |   └───[{
|   |   |   videoId,
|   |   |   title
|   |   |   }]
|   |
│   └───.vimeo
|   |   └───[{
|   |   |   videoId,
|   |   |   title
|   |   |   }]
|   |
│   └───.html5
|       └───[{
|       |   videoId,
|       |   title
|       |   }]
|
└───.sockets
    │   SOCKET-ID1
    │   SOCKET-ID2
    |   ...
```

---
id: week-02-ros2-fundamentals
title: "Week 2: ROS 2 Fundamentals"
description: "Learn the Robot Operating System (ROS 2), the industry-standard middleware for robotics. Understand nodes, topics, services, and the publish-subscribe architecture that powers modern robots."
module: "Module 1: Foundations"
week: 2
learningObjectives:
  - "Understand what ROS 2 is and why it's essential for robotics development"
  - "Explain the ROS 2 communication patterns: topics (pub-sub), services (request-reply), and actions (long-running tasks)"
  - "Create ROS 2 nodes that publish and subscribe to topics"
  - "Visualize ROS 2 communication graphs and debug node interactions"
  - "Install ROS 2 Humble and run your first talker-listener example"
prerequisites: ["week-01-physical-ai-overview"]
keywords: [ros2, robot-operating-system, publish-subscribe, nodes, topics, services, actions, middleware, dds]
difficulty: beginner
estimatedTime: 120
lastUpdated: 2025-12-31
---

# Week 2: ROS 2 Fundamentals

## Learning Objectives

By the end of this chapter, you will be able to:

1. **Understand what ROS 2 is** and articulate why it's the industry standard for robotics (modularity, reusability, community ecosystem)
2. **Explain the three ROS 2 communication patterns**:
   - **Topics** (publish-subscribe): One-to-many data streaming (sensor data, state updates)
   - **Services** (request-reply): Synchronous remote procedure calls (trigger actions, query state)
   - **Actions** (goal-feedback-result): Long-running tasks with progress updates (navigation, grasping)
3. **Create ROS 2 nodes** that publish and subscribe to topics using Python (`rclpy` library)
4. **Visualize ROS 2 systems** using `rqt_graph` to understand node connections and data flow
5. **Install ROS 2 Humble** on Ubuntu 22.04 and run the canonical talker-listener demo

---

## Conceptual Explanation: What is ROS 2?

### The Problem ROS 2 Solves

Imagine building a humanoid robot from scratch. You need:

- **Perception**: Camera drivers, object detection, depth estimation
- **Localization**: SLAM (Simultaneous Localization and Mapping) to know where the robot is
- **Planning**: Motion planning to navigate without collisions
- **Control**: PID controllers for arm joints, balance controllers for bipedal locomotion
- **Manipulation**: Grasping algorithms, force control
- **Human-robot interaction**: Speech recognition, natural language understanding

**Without ROS 2**, you'd have to:
1. Write low-level code to interface with every sensor and actuator
2. Create custom communication protocols between software components
3. Reinvent algorithms for perception, planning, control (or find incompatible libraries)
4. Build debugging tools to visualize sensor data and system state
5. Struggle with scalability when adding new sensors or features

**With ROS 2**, you get:
1. **Hardware abstraction**: Standardized interfaces for sensors/actuators (camera drivers, motor controllers)
2. **Modular architecture**: Separate processes (nodes) communicate via well-defined messages
3. **Reusable libraries**: Thousands of open-source packages for perception (OpenCV, PCL), planning (MoveIt), control (ros2_control)
4. **Built-in tools**: Visualization (RViz), debugging (rqt_graph), simulation (Gazebo integration)
5. **Scalability**: Add new nodes without modifying existing code

**ROS 2 is not an operating system** (despite the name). It's a **middleware framework**—a layer of software that sits between the operating system (Ubuntu Linux) and your robot application code. Think of it as the "nervous system" that connects sensors (eyes, ears) to the "brain" (planning, decision-making) to the "muscles" (motors, actuators).

### ROS 1 vs. ROS 2: Why the Redesign?

**ROS 1** (released 2007) revolutionized academic robotics research but had limitations:

- **No real-time support**: Unpredictable message delivery, unsuitable for hard real-time control
- **Single point of failure**: Master node coordinates all communication—if it crashes, the entire system fails
- **TCP-only communication**: High latency, not suitable for high-frequency data (camera streams, control loops)
- **No built-in security**: Messages are unencrypted, no authentication
- **Limited embedded support**: Difficult to run on resource-constrained devices (Raspberry Pi, Jetson)

**ROS 2** (first stable release 2017, current LTS: Humble 2022) redesigned the architecture:

- **DDS (Data Distribution Service) middleware**: Industry-standard pub-sub protocol with QoS (Quality of Service), real-time support, no master node
- **Real-time capable**: Deterministic message delivery with properly configured system
- **Security**: Encryption, authentication, access control (SROS2)
- **Embedded-friendly**: Runs on microcontrollers (ESP32, STM32) and edge devices (Jetson, Raspberry Pi)
- **Multi-platform**: Linux, Windows, macOS (ROS 1 was Linux-only)
- **Lifecycle nodes**: Explicit state management (configuring, active, inactive) for reliable startup/shutdown

**Key Insight**: ROS 2 is production-ready. Major companies use it: Tesla (Optimus development), Amazon (warehouse robots), NASA (Mars rovers), automotive (autonomous vehicles). ROS 1 is in maintenance mode—new projects should use ROS 2.

### ROS 2 Core Concepts

**1. Nodes**: Independent processes that perform computation.
   - Example: `camera_driver` node publishes images, `object_detector` node subscribes to images and publishes detected objects
   - Nodes run in separate processes → if one crashes, others keep running

**2. Topics**: Named channels for one-to-many data streaming (publish-subscribe pattern).
   - Example: `/camera/image_raw` topic carries camera images
   - Multiple nodes can subscribe to the same topic
   - Publishers and subscribers are decoupled—they don't need to know about each other

**3. Messages**: Data structures sent over topics.
   - Example: `sensor_msgs/Image` for camera images, `geometry_msgs/Twist` for velocity commands
   - Defined in `.msg` files, auto-generate Python/C++ code

**4. Services**: Synchronous request-reply interactions.
   - Example: `/get_robot_state` service returns current joint positions when called
   - Client sends request, waits for response (blocking)

**5. Actions**: Long-running tasks with feedback.
   - Example: `/navigate_to_goal` action navigates robot to a target position, sends periodic progress updates
   - Client can cancel action mid-execution

**6. Parameters**: Configuration values that can be changed at runtime.
   - Example: `max_velocity` parameter for a motor controller
   - Can be set via command line or config files

---

## The ROS 2 Architecture: Nodes, Topics, Messages

### Textual Diagram: Simple ROS 2 System

Below is a description of a simple ROS 2 system with three nodes communicating via topics. (Diagram: Three boxes representing nodes, with labeled arrows showing topic connections.)

**Node 1: camera_driver**
- Publishes to topic: `/camera/image_raw`
- Message type: `sensor_msgs/Image`
- Frequency: 30 Hz (30 frames per second)
- Function: Reads frames from camera hardware, publishes as ROS messages

**Node 2: object_detector**
- Subscribes to topic: `/camera/image_raw`
- Publishes to topic: `/detected_objects`
- Message type (output): `vision_msgs/Detection2DArray`
- Function: Runs YOLO object detection on images, publishes bounding boxes

**Node 3: robot_controller**
- Subscribes to topic: `/detected_objects`
- Publishes to topic: `/cmd_vel` (command velocity)
- Message type (output): `geometry_msgs/Twist`
- Function: Decides robot motion based on detected objects (e.g., avoid obstacles)

**Data Flow**:
1. `camera_driver` captures image → publishes to `/camera/image_raw`
2. `object_detector` receives image → processes → publishes detections to `/detected_objects`
3. `robot_controller` receives detections → computes safe velocity → publishes to `/cmd_vel`
4. Motor driver (not shown) subscribes to `/cmd_vel` and moves wheels

**Caption**: A simple ROS 2 system showing publish-subscribe communication. Nodes are decoupled—replacing `object_detector` with a different algorithm requires no changes to `camera_driver` or `robot_controller`.

### Why Publish-Subscribe (Pub-Sub)?

**Alternative 1: Direct function calls**
- Problem: `object_detector` would need to know the exact interface of `camera_driver`
- Tight coupling: Changing one component breaks others
- No parallelism: Everything runs in the same process

**Alternative 2: Shared memory or files**
- Problem: Complex synchronization, race conditions
- Hard to debug: Who wrote what, when?

**Pub-Sub advantages**:
- **Decoupling**: Publishers don't know who (if anyone) is subscribed
- **Scalability**: Add new subscribers (e.g., data logger) without modifying publisher
- **Debugging**: Use `ros2 topic echo` to inspect messages without writing code
- **Replay**: Record topics to a bag file, replay for testing

---

## ROS 2 Communication Patterns Explained

### Pattern 1: Topics (Publish-Subscribe)

**Use Case**: Streaming sensor data, robot state updates, continuous data flow.

**Characteristics**:
- **Asynchronous**: Publisher doesn't wait for subscribers
- **One-to-many**: One publisher, zero or more subscribers
- **No response**: Publisher doesn't know if anyone received the message
- **High frequency**: Suitable for 100+ Hz data (camera, LiDAR, IMU)

**Example Topics**:
- `/camera/image_raw`: Camera images (30 Hz)
- `/scan`: LiDAR scan data (10-40 Hz)
- `/joint_states`: Current positions of all robot joints (50-100 Hz)
- `/odom`: Odometry (robot position/velocity estimates) (20-50 Hz)

**Python Example** (covered in Implementation section below):
```python
# Publisher
self.publisher = self.create_publisher(String, 'chatter', 10)
self.publisher.publish(msg)

# Subscriber
self.subscription = self.create_subscription(String, 'chatter', self.callback, 10)
```

### Pattern 2: Services (Request-Reply)

**Use Case**: Triggering actions, querying state, configuration changes.

**Characteristics**:
- **Synchronous**: Client blocks waiting for response
- **One-to-one**: One client request → one server response
- **Guaranteed response**: Server must reply (or timeout)
- **Low frequency**: Not suitable for high-rate operations

**Example Services**:
- `/get_robot_state`: Returns current joint positions (request: empty, response: joint angles)
- `/enable_motors`: Turns motors on/off (request: bool, response: success status)
- `/set_parameters`: Changes configuration values at runtime

**Python Example** (simplified):
```python
# Service server
self.srv = self.create_service(AddTwoInts, 'add_two_ints', self.add_callback)

def add_callback(self, request, response):
    response.sum = request.a + request.b
    return response

# Service client
client = self.create_client(AddTwoInts, 'add_two_ints')
response = client.call(request)  # Blocks until server responds
```

### Pattern 3: Actions (Goal-Feedback-Result)

**Use Case**: Long-running tasks that provide progress updates and can be canceled.

**Characteristics**:
- **Asynchronous with feedback**: Client sends goal, receives periodic feedback, gets final result
- **Cancelable**: Client can cancel the action mid-execution
- **State tracking**: Action server tracks state (accepted, executing, succeeded, aborted, canceled)

**Example Actions**:
- `/navigate_to_goal`: Navigate robot to target position (feedback: current distance to goal, result: success/failure)
- `/pick_object`: Grasp an object (feedback: gripper position, result: object grasped or failed)
- `/follow_trajectory`: Execute a joint trajectory (feedback: % complete, result: reached goal or error)

**When to Use Actions vs. Services**:
- **Service**: Fast operation (< 1 second), no need for feedback. Example: "Get current battery level"
- **Action**: Long operation (seconds to minutes), need progress updates or cancellation. Example: "Navigate to kitchen (30 seconds), report progress every second, allow cancel if user interrupts"

---

## Tooling and Stack

### ROS 2 Humble (LTS Release)

**Version**: Humble Hawksbill (released May 2022, supported until May 2027)

**Why Humble?**:
- **Long-Term Support (LTS)**: 5 years of updates (security patches, bug fixes)
- **Stability**: Widely used in industry and research, well-tested
- **Ubuntu 22.04 LTS support**: Aligns with OS LTS cycle

**Alternatives**:
- **Iron Irwini** (May 2023, non-LTS): 18 months support, newer features
- **Rolling**: Continuous updates, for developers tracking latest changes

**Recommendation**: Use Humble for this textbook (stability + long support).

### Installation Options

**Option 1: Native Ubuntu 22.04** (recommended for best performance)
- ROS 2 Humble packages installed via `apt`
- Full hardware access (USB devices, GPUs)

**Option 2: WSL2 (Windows Subsystem for Linux)**
- Run Ubuntu 22.04 on Windows 10/11
- Good for development, some hardware limitations (USB passthrough required for cameras, LiDAR)

**Option 3: Docker**
- Containerized ROS 2 environment
- Consistent across platforms, easy to reset
- Slight performance overhead

**Option 4: Virtual Machine** (not recommended)
- Slower performance, complex GPU passthrough

### ROS 2 CLI Tools

Once installed, these commands are available:

- **`ros2 run <package> <node>`**: Run a node from a package
- **`ros2 topic list`**: List all active topics
- **`ros2 topic echo <topic>`**: Print messages on a topic
- **`ros2 topic hz <topic>`**: Measure message frequency
- **`ros2 node list`**: List all running nodes
- **`ros2 service list`**: List all services
- **`ros2 pkg list`**: List all installed packages
- **`rqt_graph`**: Visualize node graph (nodes and topics as diagram)

---

## Step-by-Step Implementation: Installing ROS 2 Humble

### Step 1: Verify Ubuntu Version

ROS 2 Humble requires Ubuntu 22.04 (Jammy Jellyfish).

```bash
lsb_release -a
```

**Expected output**:
```
Distributor ID: Ubuntu
Description:    Ubuntu 22.04.x LTS
Release:        22.04
Codename:       jammy
```

If you're on Ubuntu 20.04, upgrade to 22.04 or use ROS 2 Galactic (supported until Nov 2024, not recommended for new projects).

### Step 2: Set Up ROS 2 Apt Repository

```bash
# Ensure UTF-8 locale
sudo apt update && sudo apt install locales
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8

# Add ROS 2 apt repository
sudo apt install software-properties-common
sudo add-apt-repository universe

# Add ROS 2 GPG key
sudo apt update && sudo apt install curl -y
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg

# Add repository to sources list
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(. /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null
```

### Step 3: Install ROS 2 Humble Desktop

```bash
# Update package index
sudo apt update

# Upgrade existing packages (recommended to avoid conflicts)
sudo apt upgrade

# Install ROS 2 Humble Desktop (includes RViz, rqt, demos)
sudo apt install ros-humble-desktop
```

**Installation size**: ~1.5 GB

**What's included**:
- Core ROS 2 libraries (`rclcpp`, `rclpy`)
- Common messages (`std_msgs`, `sensor_msgs`, `geometry_msgs`)
- Visualization tools (RViz2, rqt)
- Demo packages (talker-listener, turtlesim)

**Alternative**: `ros-humble-ros-base` (no GUI tools, smaller, for headless servers)

### Step 4: Install Development Tools

```bash
sudo apt install ros-dev-tools
```

**What's included**:
- `colcon`: Build tool for ROS 2 packages
- `rosdep`: Dependency management
- Additional build utilities

### Step 5: Source ROS 2 Environment

Every time you open a new terminal, you must source the ROS 2 setup script to add ROS commands to your PATH.

```bash
source /opt/ros/humble/setup.bash
```

**Make it automatic** (add to `~/.bashrc` so it runs on every terminal startup):

```bash
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

**Verify installation**:

```bash
ros2 --help
```

**Expected output**: List of ROS 2 commands (`run`, `topic`, `node`, `service`, etc.)

---

## Step-by-Step Implementation: Your First ROS 2 Nodes

### Example 1: Talker-Listener Demo (Built-in)

The canonical ROS 2 demo: one node publishes messages, another subscribes and prints them.

**Terminal 1: Run talker node**

```bash
ros2 run demo_nodes_py talker
```

**Expected output**:
```
[INFO] [1672531200.123]: Publishing: "Hello World: 0"
[INFO] [1672531201.123]: Publishing: "Hello World: 1"
[INFO] [1672531202.123]: Publishing: "Hello World: 2"
...
```

The `talker` node publishes a string message every second to the topic `/chatter`.

**Terminal 2: Run listener node** (in a NEW terminal)

```bash
ros2 run demo_nodes_py listener
```

**Expected output**:
```
[INFO] [1672531200.125]: I heard: "Hello World: 0"
[INFO] [1672531201.125]: I heard: "Hello World: 1"
[INFO] [1672531202.125]: I heard: "Hello World: 2"
...
```

The `listener` node subscribes to `/chatter` and prints received messages.

**What's happening**:
1. `talker` creates a publisher on topic `/chatter` with message type `std_msgs/String`
2. `listener` creates a subscriber on topic `/chatter`
3. DDS middleware (running behind the scenes) routes messages from publisher to subscriber
4. Both nodes run independently—you can start/stop them in any order

**Terminal 3: Inspect the topic** (in a third terminal)

```bash
# List all topics
ros2 topic list
```

**Output**:
```
/chatter
/parameter_events
/rosout
```

**Examine topic details**:

```bash
ros2 topic info /chatter
```

**Output**:
```
Type: std_msgs/msg/String
Publisher count: 1
Subscription count: 1
```

**Echo messages** (print to terminal without writing code):

```bash
ros2 topic echo /chatter
```

**Output**: Same as listener node (prints messages as they arrive)

**Measure frequency**:

```bash
ros2 topic hz /chatter
```

**Output**:
```
average rate: 1.000
        min: 0.999s max: 1.001s std dev: 0.0005s window: 10
```

(Publishes approximately once per second)

### Example 2: Visualize Node Graph

**Install rqt_graph** (if not already installed):

```bash
sudo apt install ros-humble-rqt-graph
```

**Run rqt_graph** (with talker and listener still running):

```bash
rqt_graph
```

A GUI window opens showing:
- Two nodes: `/talker` and `/listener`
- An arrow from `/talker` to `/listener` labeled `/chatter`

**Caption**: rqt_graph visualization shows nodes (ovals) and topics (arrows). This is invaluable for debugging complex systems with dozens of nodes.

---

## Step-by-Step Implementation: Writing Custom Nodes in Python

### Example 3: Simple Publisher Node

Create a file `simple_publisher.py`:

```python
#!/usr/bin/env python3
"""
Simple ROS 2 Publisher Node
Publishes incrementing counter to /counter topic.
"""

import rclpy
from rclpy.node import Node
from std_msgs.msg import Int32


class SimplePublisher(Node):
    def __init__(self):
        # Initialize node with name 'simple_publisher'
        super().__init__('simple_publisher')

        # Create publisher
        # Topic: /counter, Message type: Int32, Queue size: 10
        self.publisher_ = self.create_publisher(Int32, 'counter', 10)

        # Create timer that calls callback every 1 second
        timer_period = 1.0  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)

        # Counter variable
        self.counter = 0

        self.get_logger().info('Simple Publisher Node started')

    def timer_callback(self):
        # Create message
        msg = Int32()
        msg.data = self.counter

        # Publish message
        self.publisher_.publish(msg)

        # Log to console
        self.get_logger().info(f'Publishing: {self.counter}')

        # Increment counter
        self.counter += 1


def main(args=None):
    # Initialize ROS 2 Python client library
    rclpy.init(args=args)

    # Create node instance
    node = SimplePublisher()

    # Spin (keep node running, processing callbacks)
    rclpy.spin(node)

    # Cleanup on shutdown (Ctrl+C)
    node.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

**Run the publisher**:

```bash
chmod +x simple_publisher.py  # Make executable
python3 simple_publisher.py
```

**Expected output**:
```
[INFO] [1672531200.000]: Simple Publisher Node started
[INFO] [1672531200.000]: Publishing: 0
[INFO] [1672531201.000]: Publishing: 1
[INFO] [1672531202.000]: Publishing: 2
...
```

**In another terminal, echo the topic**:

```bash
ros2 topic echo /counter
```

**Output**:
```
data: 0
---
data: 1
---
data: 2
---
...
```

### Example 4: Simple Subscriber Node

Create a file `simple_subscriber.py`:

```python
#!/usr/bin/env python3
"""
Simple ROS 2 Subscriber Node
Subscribes to /counter topic and prints received values.
"""

import rclpy
from rclpy.node import Node
from std_msgs.msg import Int32


class SimpleSubscriber(Node):
    def __init__(self):
        super().__init__('simple_subscriber')

        # Create subscriber
        # Topic: /counter, Message type: Int32, Callback: self.listener_callback
        # Queue size: 10
        self.subscription = self.create_subscription(
            Int32,
            'counter',
            self.listener_callback,
            10
        )
        # Prevent unused variable warning (subscription must be stored)
        self.subscription

        self.get_logger().info('Simple Subscriber Node started')

    def listener_callback(self, msg):
        # Called every time a message is received
        self.get_logger().info(f'I heard: {msg.data}')


def main(args=None):
    rclpy.init(args=args)
    node = SimpleSubscriber()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

**Run the subscriber** (with publisher still running in another terminal):

```bash
python3 simple_subscriber.py
```

**Expected output**:
```
[INFO] [1672531200.000]: Simple Subscriber Node started
[INFO] [1672531200.000]: I heard: 42
[INFO] [1672531201.000]: I heard: 43
[INFO] [1672531202.000]: I heard: 44
...
```

**What's happening**:
1. Subscriber node registers callback function with ROS 2
2. When a message arrives on `/counter`, ROS 2 calls `listener_callback(msg)`
3. Callback function prints the received value

---

## Common Pitfalls

### Pitfall 1: Forgetting to Source ROS 2 Setup

**Symptom**: `ros2: command not found` or nodes can't communicate.

**Example**:
```bash
ros2 topic list
# Output: bash: ros2: command not found
```

**Solution**:
```bash
source /opt/ros/humble/setup.bash
# Or add to ~/.bashrc for automatic sourcing
```

**Why this happens**: ROS 2 commands are not in the default PATH. Sourcing `setup.bash` adds them.

### Pitfall 2: Topic Name Mismatch

**Symptom**: Publisher and subscriber running, but no messages received.

**Example**:
- Publisher publishes to `/chatter`
- Subscriber subscribes to `/chater` (typo)

**Solution**:
Use `ros2 topic list` to verify exact topic names. ROS 2 is case-sensitive and doesn't auto-correct typos.

**Debugging**:
```bash
ros2 topic info /chatter  # Check publishers and subscribers count
```

If publisher count = 1 but subscription count = 0, subscriber is on wrong topic (or not running).

### Pitfall 3: Message Type Mismatch

**Symptom**: No communication even though topic names match.

**Example**:
- Publisher uses `std_msgs/String`
- Subscriber uses `std_msgs/Int32`

**Solution**:
Both publisher and subscriber MUST use the same message type. Use `ros2 topic info /topic_name` to verify type.

### Pitfall 4: Not Calling `rclpy.spin()`

**Symptom**: Subscriber node starts but never receives messages.

**Example**:
```python
def main():
    rclpy.init()
    node = SimpleSubscriber()
    # Missing: rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()
```

**Solution**:
Call `rclpy.spin(node)` to process callbacks. Without it, the node exits immediately and never receives messages.

### Pitfall 5: Not Handling Ctrl+C Gracefully

**Symptom**: Node doesn't stop cleanly when you press Ctrl+C.

**Example**: Node hangs or leaves zombie processes.

**Solution**:
Use try-except to catch `KeyboardInterrupt`:

```python
def main():
    rclpy.init()
    node = SimplePublisher()

    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()
```

### Pitfall 6: Misunderstanding Queue Size

**Symptom**: Messages are dropped unexpectedly.

**What is queue size?**:
- When you create a publisher or subscriber, you specify a queue size (e.g., 10)
- If subscriber can't process messages fast enough, old messages are dropped once queue is full

**Example**:
- Publisher sends 100 messages/second
- Subscriber processes 10 messages/second, queue size = 10
- 90% of messages are dropped

**Solution**:
- Increase queue size if you need message history
- Use QoS (Quality of Service) settings for reliability vs. latency tradeoffs (advanced topic, covered in later weeks)

---

## Assessment: Build a Multi-Node System

### Mini-Project: Robot Sensor Simulator

**Objective**: Create a ROS 2 system with three nodes simulating a simple robot sensor pipeline.

**Requirements**:

1. **Node 1: Sensor Simulator** (`sensor_sim.py`)
   - Publishes mock sensor data (random distance measurements) to topic `/distance`
   - Message type: `std_msgs/Float32`
   - Frequency: 10 Hz (10 messages per second)
   - Value: Random float between 0.0 and 5.0 (meters)

2. **Node 2: Obstacle Detector** (`obstacle_detector.py`)
   - Subscribes to `/distance`
   - If distance < 1.0 meters, publishes warning to `/obstacle_warning`
   - Message type: `std_msgs/Bool` (True = obstacle detected)
   - Logs warnings to console

3. **Node 3: Safety Controller** (`safety_controller.py`)
   - Subscribes to `/obstacle_warning`
   - If warning received, publishes stop command to `/cmd_vel`
   - Message type: `geometry_msgs/Twist` (velocity command)
   - Stop command: all velocities set to zero

**Deliverable**:
- Three Python scripts (`sensor_sim.py`, `obstacle_detector.py`, `safety_controller.py`)
- A README (`week-02-assessment-README.md`) with:
  - Instructions to run all three nodes
  - Screenshot or text output of `rqt_graph` showing node connections
  - Brief explanation of data flow

**Testing**:
1. Run all three nodes in separate terminals
2. Use `ros2 topic echo /obstacle_warning` to verify warnings when distance < 1.0
3. Use `ros2 topic echo /cmd_vel` to verify stop commands
4. Use `rqt_graph` to visualize connections

**Evaluation Criteria**:
- **Correctness** (40%): Do nodes communicate correctly? Is logic correct (distance < 1.0 triggers warning)?
- **Code quality** (30%): Clean code, comments, proper ROS 2 patterns
- **Documentation** (20%): Clear README with setup instructions
- **Completeness** (10%): All three nodes implemented, rqt_graph included

**Hints**:
- Use `self.create_timer(0.1, callback)` for 10 Hz publishing (0.1 seconds = 10 Hz)
- Use `random.uniform(0.0, 5.0)` to generate random distances
- Import `geometry_msgs.msg.Twist` for velocity commands
- Set `twist.linear.x = 0.0` and `twist.angular.z = 0.0` for stop command

---

## Summary

This chapter introduced **ROS 2 (Robot Operating System 2)**, the industry-standard middleware for robotics development.

**Key Takeaways**:

1. **ROS 2 is middleware**, not an operating system. It provides:
   - **Hardware abstraction**: Standardized interfaces for sensors and actuators
   - **Modular architecture**: Independent nodes communicate via messages
   - **Reusable libraries**: Thousands of open-source packages
   - **Built-in tools**: Visualization (RViz), debugging (rqt_graph), simulation (Gazebo integration)

2. **Three communication patterns**:
   - **Topics (pub-sub)**: Asynchronous, one-to-many, high-frequency streaming (sensor data, state updates)
   - **Services (request-reply)**: Synchronous, one-to-one, low-frequency queries (get state, trigger action)
   - **Actions (goal-feedback-result)**: Asynchronous with feedback, long-running tasks (navigation, grasping)

3. **ROS 2 Humble** is the current Long-Term Support (LTS) release:
   - Supported until May 2027
   - Runs on Ubuntu 22.04 LTS
   - Production-ready, used by Tesla, Amazon, NASA

4. **Core concepts**:
   - **Nodes**: Independent processes (separate programs)
   - **Topics**: Named channels for messages
   - **Messages**: Structured data (e.g., `sensor_msgs/Image`, `geometry_msgs/Twist`)
   - **DDS middleware**: Underlying protocol (replaces ROS 1's master node)

5. **Essential CLI tools**:
   - `ros2 run`: Execute nodes
   - `ros2 topic list/echo/hz/info`: Inspect topics
   - `rqt_graph`: Visualize node graph
   - `ros2 node list`: List running nodes

6. **Python ROS 2 (`rclpy`)** patterns:
   - Create node: `class MyNode(Node): ...`
   - Publisher: `self.create_publisher(MsgType, 'topic', queue_size)`
   - Subscriber: `self.create_subscription(MsgType, 'topic', callback, queue_size)`
   - Timer: `self.create_timer(period, callback)`
   - Spin: `rclpy.spin(node)` to process callbacks

**RAG-Optimized Key Concepts**:
- **ROS 2**: Middleware framework for robotics, provides communication, hardware abstraction, and reusable libraries
- **Node**: Independent process performing computation
- **Topic**: Named channel for publish-subscribe communication
- **Publish-subscribe (pub-sub)**: Communication pattern where publishers send data to topics without knowing subscribers
- **DDS (Data Distribution Service)**: Industry-standard middleware underlying ROS 2, replaces ROS 1 master node
- **rclpy**: Python client library for ROS 2
- **Queue size**: Number of messages buffered in publisher/subscriber—important for reliability

**Next Week Preview**: Week 3 covers **Kinematics and Dynamics**—how robots move. You'll learn forward kinematics (joint angles → end-effector position), inverse kinematics (desired position → joint angles), and trajectory planning. We'll use ROS 2 to control a simulated robot arm.

**Questions for Reflection**:
1. When would you use a service instead of a topic? Give a real robot example.
2. Why does ROS 2 use separate processes (nodes) instead of running everything in one program?
3. How would you debug a system where a publisher is sending messages but the subscriber isn't receiving them?

---

**Chapter Status**: ✅ COMPLETE
**File**: `textbook/docs/module-1-foundations/week-02-ros2-fundamentals.md`
**Next**: Week 3: Kinematics and Dynamics (Module 1)

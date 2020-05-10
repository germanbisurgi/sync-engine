import Box2D from './box2dweb'

const PhysicsSystem = function (params) {
  const B2World = Box2D.Dynamics.b2World
  const B2Vec2 = Box2D.Common.Math.b2Vec2

  const config = Object.assign({
    fps: 60,
    scale: 100,
    debug: false
  }, params)

  this.fps = config.fps
  this.scale = config.scale
  this.debug = config.debug
  this.bodies = {}
  this.shapes = []
  this.world = new B2World(new B2Vec2(0, 0), true)
}

// ---------------------------------------------------------------------- bodies

PhysicsSystem.prototype.createBody = function (entity, params) {
  const config = Object.assign({
    x: 50,
    y: 50,
    type: 'dynamic',
    active: true,
    allowSleep: true,
    awake: true,
    bullet: false,
    fixedRotation: false,
    angle: 0,
    angularDamping: 0,
    angularVelocity: 0,
    linearDamping: 0,
    linearVelocity: { x: 0, y: 0 },
    userData: entity
  }, params)

  const B2BodyDef = Box2D.Dynamics.b2BodyDef
  const B2Body = Box2D.Dynamics.b2Body
  const bodyDef = new B2BodyDef()
  bodyDef.position.x = config.x / this.scale
  bodyDef.position.y = config.y / this.scale
  bodyDef.active = config.active
  bodyDef.allowSleep = config.allowSleep
  bodyDef.awake = config.awake
  bodyDef.bullet = config.bullet
  bodyDef.fixedRotation = config.fixedRotation
  bodyDef.angle = config.angle
  bodyDef.angularDamping = config.angularDamping
  bodyDef.angularVelocity = config.angularVelocity
  bodyDef.linearDamping = config.linearDamping
  bodyDef.linearVelocity = config.linearVelocity
  bodyDef.userData = config.userData

  if (config.type === 'static') {
    bodyDef.type = B2Body.b2_staticBody
  }

  if (config.type === 'dynamic') {
    bodyDef.type = B2Body.b2_dynamicBody
  }

  if (config.type === 'kinematic') {
    bodyDef.type = B2Body.b2_kinematicBody
  }

  const body = this.world.CreateBody(bodyDef)
  body.active = true
  this.bodies[entity.id] = body
  return body
}

PhysicsSystem.prototype.update = function () {
  console.log(Object.keys(this.bodies).length)
  this.world.Step(1 / this.fps, 8, 3)
  this.world.ClearForces()
  for (const i in this.bodies) {
    if (!Object.prototype.hasOwnProperty.call(this.bodies, i)) {
      continue
    }
    const body = this.bodies[i]
    const entity = body.GetUserData()
    const position = this.getPosition(entity)
    const angle = this.getAngle(entity)
    entity.x = position.x
    entity.y = position.y
    entity.a = angle
  }

  if (this.debug) {
    this.shapes = []
    for (const i in this.bodies) {
      if (!Object.prototype.hasOwnProperty.call(this.bodies, i)) {
        continue
      }
      const body = this.bodies[i]
      for (let fixture = body.GetFixtureList(); fixture; fixture = fixture.GetNext()) {
        const shape = fixture.GetShape()
        const shapeObj = {}
        switch (shape.GetType()) {
          case 0:
            shapeObj.type = 'circle'
            shapeObj.radius = shape.GetRadius() * this.scale
            shapeObj.x = shape.m_p.x * this.scale + body.GetPosition().x * this.scale
            shapeObj.y = shape.m_p.y * this.scale + body.GetPosition().y * this.scale
            break
          case 1:
            shapeObj.type = 'edge'
            shapeObj.vertices = []
            shape.GetVertices().forEach((v) => {
              shapeObj.vertices.push({
                x: v.x * this.scale + body.GetPosition().x * this.scale,
                y: v.y * this.scale + body.GetPosition().y * this.scale
              })
            })
        }
        this.shapes.push(shapeObj)
      }
    }
  }
}

PhysicsSystem.prototype.getBody = function (entityId) {
  return this.bodies[entityId]
}

// -------------------------------------------------------------------- fixtures

PhysicsSystem.prototype.getFixtureDef = function (config) {
  const B2FixtureDef = Box2D.Dynamics.b2FixtureDef
  const fixDef = new B2FixtureDef()
  fixDef.density = config.density
  fixDef.friction = config.friction
  fixDef.restitution = config.restitution
  fixDef.isSensor = config.isSensor
  return fixDef
}

PhysicsSystem.prototype.addCircle = function (entity, params) {
  const config = Object.assign({
    x: 0,
    y: 0,
    radius: 25,
    density: 1,
    friction: 0.5,
    restitution: 0.5,
    isSensor: false
  }, params)
  const fixtureDefinition = this.getFixtureDef(config)
  const B2CircleShape = Box2D.Collision.Shapes.b2CircleShape
  const fixtureDef = fixtureDefinition
  fixtureDef.shape = new B2CircleShape(config.radius / this.scale)
  fixtureDef.shape.m_p = {
    x: config.x / this.scale,
    y: config.y / this.scale
  }
  const body = this.getBody(entity.id)
  body.CreateFixture(fixtureDef)
}

PhysicsSystem.prototype.addEdge = function (entity, params) {
  const config = Object.assign({
    ax: 0,
    ay: 0,
    bx: 0,
    by: 0,
    density: 1,
    friction: 0.5,
    restitution: 0.5,
    isSensor: false
  }, params)
  const fixtureDef = this.getFixtureDef(config)
  const B2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
  fixtureDef.shape = new B2PolygonShape()
  config.ax /= this.scale
  config.ay /= this.scale
  config.bx /= this.scale
  config.by /= this.scale
  fixtureDef.shape.SetAsEdge({ x: config.ax, y: config.ay }, { x: config.bx, y: config.by })
  const body = this.getBody(entity.id)
  body.CreateFixture(fixtureDef)
}

// --------------------------------------------------------------------- Getters

PhysicsSystem.prototype.getPosition = function (entity) {
  const body = this.getBody(entity.id)
  const position = body.GetPosition()
  return {
    x: position.x * this.scale,
    y: position.y * this.scale
  }
}

PhysicsSystem.prototype.getAngle = function (entity) {
  const body = this.getBody(entity.id)
  return body.GetAngle()
}

// --------------------------------------------------------------------- Setters

PhysicsSystem.prototype.setGravity = function (config) {
  this.world.SetGravity(config)
}

PhysicsSystem.prototype.applyImpulse = function (entity, config) {
  const body = this.getBody(entity.id)
  body.ApplyImpulse(config, body.GetWorldCenter())
}

PhysicsSystem.prototype.applyForce = function (entity, config) {
  const body = this.getBody(entity.id)
  body.ApplyForce(config, body.GetWorldCenter())
}

PhysicsSystem.prototype.applyTorque = function (entity, torque) {
  const body = this.getBody(entity.id)
  body.SetActive(true)
  body.SetAwake(true)
  body.ApplyTorque(torque / this.scale)
}

export default PhysicsSystem

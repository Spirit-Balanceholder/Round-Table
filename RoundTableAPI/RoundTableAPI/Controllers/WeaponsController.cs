using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using RoundTableAPI.Models;

namespace RoundTableAPI.Controllers
{
    public class WeaponsController : ApiController
    {
        Weapon[] weapons = new Weapon[]
        {
            new Weapon { ID = 1, name = "Shortsword", value = 10, weight = 5},
            new Weapon { ID = 2, name = "Longsword", value = 50, weight = 7},
            new Weapon { ID = 3, name = "Greataxe", value = 110, weight = 12}
        };

        public IEnumerable<Weapon> index()
        {
            return GetAllProducts();
        }


        private IEnumerable<Weapon> GetAllProducts()
        {
            return weapons;
        }

        public IHttpActionResult GetProduct(int id)
        {
            var weapon = weapons.FirstOrDefault((p) => p.ID == id);
            if (weapon == null)
            {
                return NotFound();
            }
            return Ok(weapon);
        }
    }
}

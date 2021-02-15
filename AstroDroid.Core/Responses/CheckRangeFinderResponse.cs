using System;
using System.Runtime.Serialization;

namespace AstroDroid.Core.Responses
{
    [DataContract]
    public class CheckRangeFinderResponse : Response
    {
        [DataMember]
        public float Distance { get; set; }
        [DataMember]
        public bool Hit { get; set; }        
    }
}
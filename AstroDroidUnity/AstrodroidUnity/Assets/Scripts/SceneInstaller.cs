using AstroDroid.Core.Interfaces;
using AstroDroid.Core.Services;
using Zenject;

namespace Assets.Scripts
{
    public class SceneInstaller : MonoInstaller
    {
        public SceneInstaller()
        {
        }
        public override void InstallBindings()
        {
            Container.Bind<IMessageService>().To<MessageService>().AsSingle();
        }
    }
}
